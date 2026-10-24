/**
 * Antigravity 中文汉化补丁 - 卸载脚本 (v3.6)
 *
 * 功能说明：
 * 1. 停止并移除后台版本自愈守护服务及开机自启注册表项。
 * 2. 校验备份版本，防止误用旧版本备份降级新版本应用。
 * 3. 采用 Windows 文件重命名避让机制将 app.asar 安全恢复为原始英文版本。
 */

const stdFs = require('fs');
const path = require('path');
const os = require('os');
const { uninstallAutoHealService } = require('./auto_heal_daemon.js');

let fs;
try {
  fs = require('original-fs');
} catch {
  fs = stdFs;
}

const ANTIGRAVITY_DIR = path.join(
  process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local'),
  'Programs',
  'antigravity'
);
const RESOURCES_DIR = path.join(ANTIGRAVITY_DIR, 'resources');
const ASAR_PATH = path.join(RESOURCES_DIR, 'app.asar');
const ASAR_BACKUP_PATH = path.join(RESOURCES_DIR, 'app.asar.backup');

function readAsarMeta(asarPath) {
  try {
    const buf = fs.readFileSync(asarPath);
    if (buf.length < 16) return { version: null, patched: false };
    const pickleSize = buf.readUInt32LE(4);
    const stringLength = buf.readUInt32LE(12);
    const dataOffset = 8 + pickleSize;
    const header = JSON.parse(buf.subarray(16, 16 + stringLength).toString('utf8'));

    let version = null;
    const pkgEntry = header?.files?.['package.json'];
    if (pkgEntry && !pkgEntry.unpacked) {
      const start = dataOffset + Number(pkgEntry.offset);
      const pkg = JSON.parse(buf.subarray(start, start + Number(pkgEntry.size)).toString('utf8'));
      version = pkg.version || null;
    }

    let patched = false;
    const preloadEntry = header?.files?.dist?.files?.['preload.js'];
    if (preloadEntry && !preloadEntry.unpacked) {
      const start = dataOffset + Number(preloadEntry.offset);
      const preload = buf.subarray(start, start + Number(preloadEntry.size)).toString('utf8');
      patched = preload.includes('Antigravity 中文汉化补丁 - 前端翻译引擎注入');
    }

    return { version, patched };
  } catch {
    return { version: null, patched: false };
  }
}

console.log('='.repeat(64));
console.log('  Antigravity 中文汉化补丁 v3.6 卸载程序');
console.log('='.repeat(64));
console.log('');

console.log('正在清理后台版本自愈守护服务...');
uninstallAutoHealService();
console.log('✓ 后台版本自愈守护服务与开机自启项已清理');
console.log('');

if (!fs.existsSync(ASAR_BACKUP_PATH)) {
  const currentMeta = fs.existsSync(ASAR_PATH) ? readAsarMeta(ASAR_PATH) : { patched: false };
  if (!currentMeta.patched) {
    console.log('✓ 当前 Antigravity 已经是未打补丁的原始英文状态。');
    process.exit(0);
  }
  console.error('错误：未找到原始备份文件。');
  console.error(`预期路径: ${ASAR_BACKUP_PATH}`);
  console.error('请通过 Antigravity 官方安装程序重新安装以恢复英文原版。');
  process.exit(1);
}

const currentMeta = fs.existsSync(ASAR_PATH) ? readAsarMeta(ASAR_PATH) : { version: null, patched: false };
const backupMeta = readAsarMeta(ASAR_BACKUP_PATH);

if (
  !currentMeta.patched &&
  currentMeta.version &&
  backupMeta.version &&
  currentMeta.version !== backupMeta.version
) {
  console.log(`检测到当前 app.asar (v${currentMeta.version}) 已是新版本英文原版，仅清理旧版备份 (v${backupMeta.version})...`);
  try {
    fs.unlinkSync(ASAR_BACKUP_PATH);
    console.log('✓ 旧版备份文件已清理');
  } catch (err) {
    console.error(`清理备份失败: ${err.message}`);
  }
  process.exit(0);
}

console.log(`正在恢复原始文件 (v${backupMeta.version || '未知'})...`);
let renamed = false;
try {
  if (fs.existsSync(ASAR_PATH)) {
    try {
      if (fs.existsSync(ASAR_PATH + '.old')) {
        fs.unlinkSync(ASAR_PATH + '.old');
      }
      fs.renameSync(ASAR_PATH, ASAR_PATH + '.old');
      renamed = true;
    } catch {
      // 如果无法重命名则直接覆盖
    }
  }

  fs.copyFileSync(ASAR_BACKUP_PATH, ASAR_PATH);
  console.log('✓ 原始文件已恢复');

  fs.unlinkSync(ASAR_BACKUP_PATH);
  console.log('✓ 备份文件已清理');

  if (renamed && fs.existsSync(ASAR_PATH + '.old')) {
    try {
      fs.unlinkSync(ASAR_PATH + '.old');
    } catch {
      // 正在运行中的句柄将在下次进程退出后释放
    }
  }
} catch (err) {
  if (renamed && !fs.existsSync(ASAR_PATH) && fs.existsSync(ASAR_PATH + '.old')) {
    try {
      fs.renameSync(ASAR_PATH + '.old', ASAR_PATH);
    } catch {}
  }
  console.error(`恢复失败: ${err.message}`);
  console.error('请确保 Antigravity 已关闭，然后重试。');
  process.exit(1);
}

console.log('');
console.log('='.repeat(64));
console.log('  ✓ 汉化补丁已彻底卸载！');
console.log('  请重新启动 Antigravity 以恢复英文界面。');
console.log('='.repeat(64));
console.log('');
