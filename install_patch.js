/**
 * Antigravity 中文汉化补丁 - 内存级极速安装与自愈脚本 (v3.0)
 *
 * 核心特性：
 * 1. 纯内存 ASAR 解析与重打包引擎：直接读取二进制流并原地替换 dist/*.js，
 *    无需将 700+ 个文件解压到 %TEMP%，彻底消除 Windows 临时目录 EPERM 锁死报错，耗时 < 100ms。
 * 2. 双层全量汉化注入：
 *    - 主进程层：源码级静态替换 + Electron Menu/Dialog/Tray 动态 API 钩子
 *    - 渲染进程层：preload.js 前端引擎注入 + 原生右键菜单/通知 IPC 拦截 + utils.js 主世界兜底注入
 * 3. 官方自动更新兼容与自愈：
 *    - 完整保留 Antigravity 官方自动更新能力
 *    - 自动注册轻量级 wscript 后台版本自愈巡检服务，官方更新覆盖 app.asar 后自动无缝重汉化
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const translations = require('./translations.js');
const { installAutoHealService, recordPatchedState } = require('./auto_heal_daemon.js');

let ofs;
try {
  ofs = require('original-fs');
} catch {
  ofs = fs;
}

// ============================================================================
// 配置路径与运行参数
// ============================================================================

const ANTIGRAVITY_DIR = path.join(
  process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local'),
  'Programs',
  'antigravity'
);
const RESOURCES_DIR = path.join(ANTIGRAVITY_DIR, 'resources');
const ASAR_PATH = path.join(RESOURCES_DIR, 'app.asar');
const ASAR_BACKUP_PATH = path.join(RESOURCES_DIR, 'app.asar.backup');
const ASAR_UNPACKED_PATH = `${ASAR_PATH}.unpacked`;
const TEMP_DIR_PREFIX = 'antigravity-zh-';

const DRY_RUN = process.argv.includes('--dry-run');
const AUTO_HEAL_MODE = process.argv.includes('--auto-heal');
const NO_DAEMON = process.argv.includes('--no-daemon');

const ASAR_BLOCK_SIZE = 4 * 1024 * 1024; // 4MB

// ============================================================================
// 纯内存 ASAR 二进制解析与构建工具（零临时文件解压）
// ============================================================================

function parseAsarBuffer(asarBuffer, label = 'app.asar') {
  if (!asarBuffer || asarBuffer.length < 16) {
    throw new Error(`ASAR 文件头过短: ${label}`);
  }
  const pickleSize = asarBuffer.readUInt32LE(4);
  const stringLength = asarBuffer.readUInt32LE(12);
  const dataOffset = 8 + pickleSize;
  const headerEnd = 16 + stringLength;
  if (headerEnd > asarBuffer.length || dataOffset > asarBuffer.length) {
    throw new Error(`ASAR 文件头长度无效: ${label}`);
  }
  const header = JSON.parse(asarBuffer.subarray(16, headerEnd).toString('utf8'));
  return { header, dataOffset };
}

function getAsarEntry(header, relPath) {
  const parts = relPath.split('/').filter(Boolean);
  let cur = header;
  for (const part of parts) {
    if (!cur || !cur.files || !Object.prototype.hasOwnProperty.call(cur.files, part)) {
      return null;
    }
    cur = cur.files[part];
  }
  return cur;
}

function readAsarFileBuffer(asarBuffer, parsed, relPath) {
  const entry = getAsarEntry(parsed.header, relPath);
  if (!entry || entry.files || entry.unpacked) {
    return null;
  }
  const start = parsed.dataOffset + Number(entry.offset);
  const end = start + Number(entry.size);
  if (start < parsed.dataOffset || end > asarBuffer.length) {
    throw new Error(`ASAR 条目偏移越界: ${relPath}`);
  }
  return asarBuffer.subarray(start, end);
}

function readAsarFileText(asarBuffer, parsed, relPath) {
  const buf = readAsarFileBuffer(asarBuffer, parsed, relPath);
  return buf ? buf.toString('utf8') : null;
}

function isAsarBufferPatched(asarBuffer, parsed) {
  try {
    const preload = readAsarFileText(asarBuffer, parsed, 'dist/preload.js');
    return Boolean(preload && preload.includes('Antigravity 中文汉化补丁 - 前端翻译引擎注入'));
  } catch {
    return false;
  }
}

function getAsarVersion(asarBuffer, parsed) {
  try {
    const pkgText = readAsarFileText(asarBuffer, parsed, 'package.json');
    if (!pkgText) return null;
    return JSON.parse(pkgText).version || null;
  } catch {
    return null;
  }
}

function collectUnpackedFiles(header) {
  const unpackedFiles = new Map();
  function walk(node, prefix = '') {
    for (const [name, entry] of Object.entries(node.files || {})) {
      const relativePath = prefix ? `${prefix}/${name}` : name;
      if (entry.files) {
        walk(entry, relativePath);
      } else if (entry.unpacked) {
        unpackedFiles.set(relativePath, {
          ...entry,
          size: Number(entry.size) || 0,
          unpacked: true,
        });
      }
    }
  }
  walk(header);
  return unpackedFiles;
}

function computeAsarIntegrity(buf) {
  const hash = crypto.createHash('sha256').update(buf).digest('hex');
  const blocks = [];
  for (let i = 0; i < buf.length; i += ASAR_BLOCK_SIZE) {
    const slice = buf.subarray(i, Math.min(i + ASAR_BLOCK_SIZE, buf.length));
    blocks.push(crypto.createHash('sha256').update(slice).digest('hex'));
  }
  if (blocks.length === 0) {
    blocks.push(crypto.createHash('sha256').update(Buffer.alloc(0)).digest('hex'));
  }
  return {
    algorithm: 'SHA256',
    hash,
    blockSize: ASAR_BLOCK_SIZE,
    blocks,
  };
}

/**
 * 在内存中直接重构修改后的 ASAR 归档并写入目标路径
 */
function writePatchedAsarInMemory(sourceBuffer, parsedSource, patchedTextMap, destPath) {
  const chunks = [];
  let currentOffset = 0;
  let archivedFileCount = 0;

  function cloneAndPatchNode(node, prefix = '') {
    const newFiles = {};
    for (const [name, entry] of Object.entries(node.files || {})) {
      const relPath = prefix ? `${prefix}/${name}` : name;
      if (entry.files) {
        newFiles[name] = cloneAndPatchNode(entry, relPath);
      } else if (entry.unpacked) {
        newFiles[name] = { ...entry, unpacked: true };
      } else {
        archivedFileCount++;
        let fileBuf;
        let integrity = entry.integrity;
        if (patchedTextMap.has(relPath)) {
          fileBuf = Buffer.from(patchedTextMap.get(relPath), 'utf8');
          if (integrity) {
            integrity = computeAsarIntegrity(fileBuf);
          }
        } else {
          const origStart = parsedSource.dataOffset + Number(entry.offset);
          const origEnd = origStart + Number(entry.size);
          fileBuf = sourceBuffer.subarray(origStart, origEnd);
        }

        const newEntry = {
          ...entry,
          size: fileBuf.length,
          offset: String(currentOffset),
        };
        if (integrity) {
          newEntry.integrity = integrity;
        }
        newFiles[name] = newEntry;
        chunks.push(fileBuf);
        currentOffset += fileBuf.length;
      }
    }
    return { files: newFiles };
  }

  const newTree = cloneAndPatchNode(parsedSource.header);
  const headerString = JSON.stringify(newTree);
  const jsonBytes = Buffer.from(headerString, 'utf8');
  const stringLength = jsonBytes.length;
  const paddingSize = (4 - (stringLength % 4)) % 4;
  const headerStringSize = 4 + stringLength + paddingSize;
  const pickleSize = 4 + headerStringSize;
  const totalHeaderSize = 8 + pickleSize;

  const headerBuf = Buffer.alloc(totalHeaderSize, 0);
  headerBuf.writeUInt32LE(4, 0);
  headerBuf.writeUInt32LE(pickleSize, 4);
  headerBuf.writeUInt32LE(headerStringSize, 8);
  headerBuf.writeUInt32LE(stringLength, 12);
  jsonBytes.copy(headerBuf, 16);

  if (destPath) {
    const fd = ofs.openSync(destPath, 'w');
    try {
      ofs.writeSync(fd, headerBuf, 0, headerBuf.length, 0);
      let writeOffset = totalHeaderSize;
      for (const chunk of chunks) {
        ofs.writeSync(fd, chunk, 0, chunk.length, writeOffset);
        writeOffset += chunk.length;
      }
    } finally {
      ofs.closeSync(fd);
    }
  }

  return {
    totalSize: totalHeaderSize + currentOffset,
    headerSize: totalHeaderSize,
    archivedFileCount,
    header: newTree,
  };
}

function cleanupStaleTempDirs() {
  const tempBase = path.resolve(os.tmpdir());
  try {
    for (const entry of ofs.readdirSync(tempBase, { withFileTypes: true })) {
      if (!entry.isDirectory() || !entry.name.startsWith(TEMP_DIR_PREFIX)) {
        continue;
      }
      const candidate = path.resolve(tempBase, entry.name);
      if (path.dirname(candidate) !== tempBase) {
        continue;
      }
      try {
        ofs.rmSync(candidate, { recursive: true, force: true });
      } catch {
        // 忽略仍被占用的历史目录
      }
    }
  } catch {
    // 忽略临时目录清理错误
  }
}

// ============================================================================
// 主安装流程
// ============================================================================

async function main() {
  const startTime = Date.now();

  console.log('='.repeat(64));
  console.log(
    DRY_RUN
      ? '  Antigravity 中文汉化补丁 v3.0 验证程序（纯内存模式，不修改安装文件）'
      : AUTO_HEAL_MODE
        ? '  Antigravity 中文汉化补丁 v3.0 自动自愈重装程序'
        : '  Antigravity 中文汉化补丁 v3.0 极速安装程序'
  );
  console.log('='.repeat(64));
  console.log('');

  cleanupStaleTempDirs();

  if (!ofs.existsSync(ASAR_PATH)) {
    console.error('错误：未找到 Antigravity 安装文件。');
    console.error(`预期路径: ${ASAR_PATH}`);
    console.error('请确认 Antigravity 已正确安装。');
    process.exit(1);
  }

  const currentAsarBuf = ofs.readFileSync(ASAR_PATH);
  const currentParsed = parseAsarBuffer(currentAsarBuf, ASAR_PATH);
  const currentIsPatched = isAsarBufferPatched(currentAsarBuf, currentParsed);
  const currentVersion = getAsarVersion(currentAsarBuf, currentParsed);

  let pristineAsarPath;
  let sourceAsarBuf;
  let sourceParsed;

  if (DRY_RUN) {
    if (!ofs.existsSync(ASAR_BACKUP_PATH) && currentIsPatched) {
      console.error('错误：当前 app.asar 已安装补丁，但原始备份不存在，无法进行可靠验证。');
      process.exit(1);
    }
    pristineAsarPath = ofs.existsSync(ASAR_BACKUP_PATH) ? ASAR_BACKUP_PATH : ASAR_PATH;
    sourceAsarBuf = pristineAsarPath === ASAR_PATH ? currentAsarBuf : ofs.readFileSync(pristineAsarPath);
    sourceParsed = parseAsarBuffer(sourceAsarBuf, pristineAsarPath);
    console.log(`验证源文件: ${pristineAsarPath}`);
  } else {
    if (!ofs.existsSync(ASAR_BACKUP_PATH)) {
      if (currentIsPatched) {
        console.error('错误：当前 app.asar 已安装补丁，但原始备份不存在。');
        console.error('为避免重复注入，安装已中止。请先通过 Antigravity 安装程序修复或更新应用。');
        process.exit(1);
      }
      console.log('正在备份原始文件...');
      ofs.copyFileSync(ASAR_PATH, ASAR_BACKUP_PATH);
      console.log(`✓ 备份已保存至: ${ASAR_BACKUP_PATH}`);
      sourceAsarBuf = currentAsarBuf;
      sourceParsed = currentParsed;
    } else if (!currentIsPatched) {
      // 官方更新后 app.asar 变为未打补丁的新版本原包，自动刷新 .backup
      console.log(`检测到新的 Antigravity 原始安装包 (v${currentVersion || '未知'})，正在自动刷新旧备份...`);
      ofs.copyFileSync(ASAR_PATH, ASAR_BACKUP_PATH);
      console.log(`✓ 原始备份已同步更新至 v${currentVersion || '未知'}: ${ASAR_BACKUP_PATH}`);
      sourceAsarBuf = currentAsarBuf;
      sourceParsed = currentParsed;
    } else {
      console.log('✓ 发现已有原始备份，将以备份为基础在内存中重新生成补丁，避免重复注入。');
      sourceAsarBuf = ofs.readFileSync(ASAR_BACKUP_PATH);
      sourceParsed = parseAsarBuffer(sourceAsarBuf, ASAR_BACKUP_PATH);
    }
    pristineAsarPath = ASAR_BACKUP_PATH;
  }

  const unpackedFiles = collectUnpackedFiles(sourceParsed.header);
  if (unpackedFiles.size > 0 && !ofs.existsSync(ASAR_UNPACKED_PATH)) {
    if (AUTO_HEAL_MODE) {
      console.warn(`警告：安装程序可能仍在解压外置目录 (${ASAR_UNPACKED_PATH})，将继续保留 unpacked 索引。`);
    } else {
      console.error(`错误：原始包引用了 ${unpackedFiles.size} 个外置文件，但未找到目录：`);
      console.error(ASAR_UNPACKED_PATH);
      process.exit(1);
    }
  } else if (unpackedFiles.size > 0) {
    const missingUnpackedFiles = [...unpackedFiles.keys()].filter(
      (relativePath) => !ofs.existsSync(path.join(ASAR_UNPACKED_PATH, relativePath))
    );
    if (missingUnpackedFiles.length > 0) {
      if (AUTO_HEAL_MODE) {
        console.warn(`警告：安装程序可能仍在解压外置文件（暂缺 ${missingUnpackedFiles.length} 个），将继续保留其 unpacked 索引。`);
      } else {
        console.error(`错误：缺少 ${missingUnpackedFiles.length} 个 ASAR 外置文件，例如：`);
        for (const relativePath of missingUnpackedFiles.slice(0, 5)) {
          console.error(`  ${relativePath}`);
        }
        process.exit(1);
      }
    }
  }
  console.log(`检测到 ${unpackedFiles.size} 个 ASAR 外置文件，将完整保留其 unpacked 索引。`);

  const sourceVersion = getAsarVersion(sourceAsarBuf, sourceParsed);
  console.log(`检测到 Antigravity 版本: ${sourceVersion || '未知版本'}`);
  console.log('');
  console.log('正在内存中读取并翻译主进程文件...');
  console.log('');

  const filesToPatch = [
    'dist/main.js',
    'dist/menu.js',
    'dist/tray.js',
    'dist/updater.js',
    'dist/loadingOverlay.js',
    'dist/ipcHandlers.js',
    'dist/wsl.js',
    'dist/provisionSplash.js',
    'dist/languageServer.js',
    'dist/utils.js',
    'dist/storage.js',
    'dist/ideInstall/wizardHtml.js',
    'dist/ideInstall/constants.js',
    'dist/ideInstall/service.js',
  ];

  let totalReplacements = 0;
  let failedReplacements = 0;
  const patchedFiles = new Map();

  for (const filePath of filesToPatch) {
    const translationKey = filePath.replace('dist/', '');
    const fileTranslations = translations[translationKey];
    if (!fileTranslations || fileTranslations.length === 0) {
      continue;
    }

    let content = readAsarFileText(sourceAsarBuf, sourceParsed, filePath);
    if (content === null) {
      // 某些新模块（如 wsl.js / provisionSplash.js）在旧版本中可能不存在
      const allOptional = fileTranslations.every((item) => item.optional);
      if (!allOptional) {
        console.error(`  ✗ 未找到归档内文件: ${filePath}`);
      }
      continue;
    }

    let fileReplacements = 0;
    for (const { original, translated, optional } of fileTranslations) {
      if (original === translated) {
        continue;
      }

      if (content.includes(original)) {
        content = content.replace(original, translated);
        fileReplacements++;
        totalReplacements++;
      } else if (content.includes(translated)) {
        console.log(`  ⚠ 已翻译，跳过: "${original.substring(0, 40)}..."`);
      } else if (!optional) {
        console.error(`  ✗ 未找到匹配文本 (${filePath}): "${original.substring(0, 50)}..."`);
        failedReplacements++;
      }
    }

    if (fileReplacements > 0) {
      console.log(`  ✓ ${filePath} - ${fileReplacements} 处静态翻译`);
      patchedFiles.set(filePath, content);
    }
  }

  // ==========================================================================
  // 注入主进程原生 API 动态汉化钩子 (MAIN_PROCESS_I18N_HOOK) 到 dist/main.js
  // ==========================================================================
  let mainJsContent = patchedFiles.get('dist/main.js') ?? readAsarFileText(sourceAsarBuf, sourceParsed, 'dist/main.js');
  if (mainJsContent && translations.MAIN_PROCESS_I18N_HOOK) {
    const mainHookAnchor = 'const electron_1 = require("electron");';
    if (mainJsContent.includes(mainHookAnchor) && !mainJsContent.includes('__agyMainHookInstalled')) {
      mainJsContent = mainJsContent.replace(
        mainHookAnchor,
        `${mainHookAnchor}\n${translations.MAIN_PROCESS_I18N_HOOK}`
      );
      patchedFiles.set('dist/main.js', mainJsContent);
      console.log('  ✓ dist/main.js - 已注入主进程 Menu/Dialog/Tray 动态汉化钩子');
    }
  }

  console.log('');
  console.log(`主进程翻译统计: 成功 ${totalReplacements} 处, 失败 ${failedReplacements} 处`);
  if (failedReplacements > 0) {
    console.log('  ⚠ 部分静态条目因版本差异未匹配，已由主进程动态 API 钩子自动接管兜底。');
  }

  // ==========================================================================
  // 注入前端翻译脚本与 IPC 原生菜单拦截器到 dist/preload.js
  // ==========================================================================
  console.log('');
  console.log('正在注入前端翻译引擎与原生右键菜单 IPC 拦截器...');

  const i18nScriptPath = path.join(__dirname, 'i18n_inject.js');
  const i18nScript = ofs.existsSync(i18nScriptPath) ? ofs.readFileSync(i18nScriptPath, 'utf8') : null;
  const preloadContent = readAsarFileText(sourceAsarBuf, sourceParsed, 'dist/preload.js');

  if (preloadContent && i18nScript) {
    const ipcHookSnippet = `
// 拦截渲染进程发往主进程的原生右键菜单 (window:show-context-menu) 与通知 (notification:send)
try {
  if (typeof electron_1 !== 'undefined' && electron_1.ipcRenderer && typeof electron_1.ipcRenderer.invoke === 'function') {
    const _origInvoke = electron_1.ipcRenderer.invoke.bind(electron_1.ipcRenderer);
    const _trMenuItem = (item) => {
      if (!item || typeof item !== 'object') return item;
      const copy = { ...item };
      if (typeof copy.label === 'string' && copy.label && typeof globalThis.__agyTranslateString === 'function') {
        copy.label = globalThis.__agyTranslateString(copy.label) || copy.label;
      }
      if (Array.isArray(copy.submenu)) copy.submenu = copy.submenu.map(_trMenuItem);
      if (Array.isArray(copy.items)) copy.items = copy.items.map(_trMenuItem);
      return copy;
    };
    electron_1.ipcRenderer.invoke = function(channel, ...args) {
      try {
        if (channel === 'window:show-context-menu' && Array.isArray(args[0])) {
          args[0] = args[0].map(_trMenuItem);
        } else if (channel === 'notification:send' && args[0] && typeof args[0] === 'object' && typeof globalThis.__agyTranslateString === 'function') {
          args[0] = {
            ...args[0],
            title: typeof args[0].title === 'string' ? (globalThis.__agyTranslateString(args[0].title) || args[0].title) : args[0].title,
            body: typeof args[0].body === 'string' ? (globalThis.__agyTranslateString(args[0].body) || args[0].body) : args[0].body,
          };
        }
      } catch {}
      return _origInvoke(channel, ...args);
    };
  }
} catch {}
`;

    const injectedPreload = `${preloadContent}\n
// ============================================================================
// Antigravity 中文汉化补丁 - 前端翻译引擎注入
// ============================================================================
(function() {
${i18nScript}
})();
${ipcHookSnippet}
`;
    patchedFiles.set('dist/preload.js', injectedPreload);
    console.log('✓ 前端翻译引擎与右键菜单拦截器已注入到 dist/preload.js');
  } else {
    console.log('⚠ 未找到 preload.js 或 i18n_inject.js，跳过 preload 翻译注入');
  }

  // ==========================================================================
  // 注入 executeJavaScript 兜底翻译引擎到 dist/utils.js
  // ==========================================================================
  let utilsContent = patchedFiles.get('dist/utils.js') ?? readAsarFileText(sourceAsarBuf, sourceParsed, 'dist/utils.js');
  if (utilsContent && i18nScript) {
    const escapedScript = JSON.stringify(i18nScript);
    const injectPoint = 'void win.loadURL(url);\n    return win;';
    const injectCode = `void win.loadURL(url);
    // Antigravity 汉化补丁 - 在主世界中注入前端翻译引擎
    win.webContents.on('did-finish-load', () => {
        win.webContents.executeJavaScript(${escapedScript}).catch(() => {});
    });
    win.webContents.on('did-navigate', () => {
        win.webContents.executeJavaScript(${escapedScript}).catch(() => {});
    });
    return win;`;

    if (utilsContent.includes(injectPoint)) {
      utilsContent = utilsContent.replace(injectPoint, injectCode);
      patchedFiles.set('dist/utils.js', utilsContent);
      console.log('✓ executeJavaScript 主世界兜底引擎已注入到 dist/utils.js');
    } else {
      console.log('⚠ 未找到 utils.js 注入点，仅使用 preload.js 翻译引擎');
    }
  }

  // ==========================================================================
  // 内存级重打包并写出 ASAR 文件
  // ==========================================================================
  console.log('');
  console.log(DRY_RUN ? '正在内存中构建并校验 ASAR 归档...' : '正在将汉化后的 ASAR 归档写入安装目录...');

  let renamed = false;
  if (!DRY_RUN && ofs.existsSync(ASAR_PATH)) {
    try {
      if (ofs.existsSync(ASAR_PATH + '.old')) {
        ofs.unlinkSync(ASAR_PATH + '.old');
      }
      ofs.renameSync(ASAR_PATH, ASAR_PATH + '.old');
      renamed = true;
      console.log('  [Windows 避让] 已将运行中占用的旧 app.asar 重命名为 app.asar.old');
    } catch (e) {
      console.log('  [Windows 避让] 重命名未执行，将直接写入: ' + e.message);
    }
  }

  let buildResult;
  try {
    buildResult = writePatchedAsarInMemory(
      sourceAsarBuf,
      sourceParsed,
      patchedFiles,
      DRY_RUN ? null : ASAR_PATH
    );
    console.log(
      `✓ ASAR 构建完成 (${(buildResult.totalSize / 1024 / 1024).toFixed(2)} MB，含 ${buildResult.archivedFileCount} 个归档文件、${unpackedFiles.size} 个外置文件)`
    );

    if (!DRY_RUN && renamed) {
      try {
        ofs.unlinkSync(ASAR_PATH + '.old');
        console.log('  [Windows 避让] 已清理临时备份 app.asar.old');
      } catch {
        console.log('  [Windows 避让] app.asar.old 仍被当前运行进程引用，将在下次更新或重启后清理');
      }
    }
  } catch (err) {
    console.error(`✗ 打包失败: ${err.message}`);
    if (!DRY_RUN) {
      console.error('正在恢复备份...');
      if (renamed && ofs.existsSync(ASAR_PATH + '.old')) {
        try {
          ofs.renameSync(ASAR_PATH + '.old', ASAR_PATH);
        } catch {
          ofs.copyFileSync(ASAR_BACKUP_PATH, ASAR_PATH);
        }
      } else if (ofs.existsSync(ASAR_BACKUP_PATH)) {
        ofs.copyFileSync(ASAR_BACKUP_PATH, ASAR_PATH);
      }
      console.log('✓ 已恢复备份文件');
    }
    process.exit(1);
  }

  // ==========================================================================
  // 验证打包结果
  // ==========================================================================
  console.log('');
  console.log('正在验证打包结果...');
  try {
    if (buildResult.totalSize < 500000) {
      throw new Error(`打包后文件过小 (${buildResult.totalSize} 字节)`);
    }

    const verifyMain = patchedFiles.get('dist/main.js') || '';
    if (!verifyMain.includes('确认退出') && !verifyMain.includes('__agyMainHookInstalled')) {
      throw new Error('dist/main.js 汉化内容验证失败');
    }
    console.log('  ✓ 主进程翻译与动态 API 钩子验证通过');

    const verifyPreload = patchedFiles.get('dist/preload.js') || '';
    if (!verifyPreload.includes('Antigravity 中文汉化补丁 - 前端翻译引擎注入')) {
      throw new Error('dist/preload.js 前端引擎注入验证失败');
    }
    console.log('  ✓ 前端翻译引擎与右键菜单拦截器验证通过');

    const header = DRY_RUN ? buildResult.header : parseAsarBuffer(ofs.readFileSync(ASAR_PATH), ASAR_PATH).header;
    if (!header.files || !header.files.dist || !header.files.node_modules || !header.files['package.json']) {
      throw new Error('ASAR header 目录树结构不完整');
    }
    const nmCount = Object.keys(header.files.node_modules.files || {}).length;
    console.log(`  ✓ ASAR 结构验证通过 (node_modules 包含 ${nmCount} 个顶层模块)`);

    const packedUnpackedFiles = collectUnpackedFiles(header);
    if (packedUnpackedFiles.size !== unpackedFiles.size) {
      throw new Error(`ASAR 外置文件索引不完整（预期 ${unpackedFiles.size}，实际 ${packedUnpackedFiles.size}）`);
    }
    console.log(`  ✓ ${packedUnpackedFiles.size} 个 unpacked 外置文件索引验证通过`);
  } catch (err) {
    console.error(`✗ 验证失败: ${err.message}`);
    if (!DRY_RUN && ofs.existsSync(ASAR_BACKUP_PATH)) {
      console.error('正在恢复备份...');
      ofs.copyFileSync(ASAR_BACKUP_PATH, ASAR_PATH);
      console.log('✓ 已恢复备份文件');
    }
    process.exit(1);
  }

  // ==========================================================================
  // 部署版本更新自愈守护服务
  // ==========================================================================
  if (!DRY_RUN) {
    if (AUTO_HEAL_MODE) {
      recordPatchedState(ASAR_PATH);
    } else if (!NO_DAEMON) {
      console.log('');
      console.log('正在配置版本更新自动自愈守护服务...');
      if (installAutoHealService(__dirname)) {
        console.log('  ✓ 已启用后台版本更新自愈守护（官方更新后将自动无缝重汉化）');
      } else {
        console.log('  ⚠ 自愈守护注册未完成，核心汉化补丁仍已正常生效');
      }
    }
  }

  const elapsedMs = Date.now() - startTime;
  console.log('');
  console.log('='.repeat(64));
  console.log(
    DRY_RUN
      ? `  ✓ 验证完成（耗时 ${elapsedMs}ms），安装文件未被修改。`
      : `  ✓ 汉化补丁 v3.0 安装成功！（耗时 ${elapsedMs}ms）`
  );
  if (!DRY_RUN && !AUTO_HEAL_MODE) {
    console.log('  请重新启动 Antigravity 以查看完整中文界面效果。');
  }
  console.log('='.repeat(64));
  console.log('');
}

main().catch((err) => {
  console.error('安装过程出错:', err);
  process.exit(1);
});
