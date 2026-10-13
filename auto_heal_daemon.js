/**
 * Antigravity 中文汉化补丁 - 版本更新自愈守护模块 (auto_heal_daemon.js)
 *
 * 功能说明：
 * 1. 提供轻量级后台自愈服务安装/卸载接口（供 install_patch.js / uninstall_patch.js 调用）。
 * 2. 采用 Windows 原生 wscript.exe 静默巡检脚本 (auto_heal.vbs) 监控 resources/app.asar 的文件指纹：
 *    - 平时仅读取文件修改时间与大小，不持有 Antigravity.exe 进程锁，完全不影响官方安装器更新。
 *    - 当检测到 Antigravity 官方自动更新重写了 app.asar 时，自动调用 install_patch.js --auto-heal
 *      在 50ms 内完成新版本备份刷新与内存级重汉化。
 * 3. 同时支持作为独立 Node 守护进程运行：
 *    - `node auto_heal_daemon.js --once`：单次检测并按需修复
 *    - `node auto_heal_daemon.js`：常驻监听模式
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync, spawn, spawnSync } = require('child_process');

let ofs;
try {
  ofs = require('original-fs');
} catch {
  ofs = fs;
}

const ANTIGRAVITY_DIR = path.join(
  process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local'),
  'Programs',
  'antigravity'
);
const RESOURCES_DIR = path.join(ANTIGRAVITY_DIR, 'resources');
const ASAR_PATH = path.join(RESOURCES_DIR, 'app.asar');
const ANTIGRAVITY_EXE = path.join(ANTIGRAVITY_DIR, 'Antigravity.exe');

const PATCH_DATA_DIR = path.join(
  process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming'),
  'AntigravityChinesePatch'
);
const STATE_FILE_PATH = path.join(PATCH_DATA_DIR, 'patched_state.txt');
const SOURCE_DIR_FILE = path.join(PATCH_DATA_DIR, 'source_dir.txt');
const LOG_FILE_PATH = path.join(PATCH_DATA_DIR, 'auto_heal.log');
const VBS_FILE_PATH = path.join(PATCH_DATA_DIR, 'auto_heal.vbs');
const REG_RUN_KEY = 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run';
const REG_VALUE_NAME = 'AntigravityChinesePatchAutoHeal';

function appendLog(message) {
  try {
    if (!ofs.existsSync(PATCH_DATA_DIR)) {
      ofs.mkdirSync(PATCH_DATA_DIR, { recursive: true });
    }
    const line = `[${new Date().toISOString()}] ${message}\r\n`;
    ofs.appendFileSync(LOG_FILE_PATH, line, 'utf8');
  } catch {
    // 忽略日志写入异常
  }
}

/**
 * 直接从二进制 ASAR 归档中检查 dist/preload.js 是否包含汉化注入标记
 */
function isAsarPatchedRaw(asarPath) {
  try {
    if (!ofs.existsSync(asarPath)) return false;
    const buf = ofs.readFileSync(asarPath);
    if (buf.length < 16) return false;
    const pickleSize = buf.readUInt32LE(4);
    const stringLength = buf.readUInt32LE(12);
    const dataOffset = 8 + pickleSize;
    const headerEnd = 16 + stringLength;
    if (headerEnd > buf.length || dataOffset > buf.length) return false;
    const header = JSON.parse(buf.subarray(16, headerEnd).toString('utf8'));
    const entry = header?.files?.dist?.files?.['preload.js'];
    if (!entry || entry.unpacked) return false;
    const start = dataOffset + Number(entry.offset);
    const end = start + Number(entry.size);
    const content = buf.subarray(start, end).toString('utf8');
    return content.includes('Antigravity 中文汉化补丁 - 前端翻译引擎注入');
  } catch {
    return false;
  }
}

/**
 * 记录当前已汉化 app.asar 的文件大小特征，供 VBS 巡检快速比对
 */
function recordPatchedState(asarPath = ASAR_PATH) {
  try {
    if (!ofs.existsSync(asarPath)) return;
    const stat = ofs.statSync(asarPath);
    if (!ofs.existsSync(PATCH_DATA_DIR)) {
      ofs.mkdirSync(PATCH_DATA_DIR, { recursive: true });
    }
    ofs.writeFileSync(STATE_FILE_PATH, `${stat.size}`, 'utf8');
  } catch {
    // 忽略状态写入错误
  }
}

/**
 * 从原始工作区目录同步最新的词库与补丁脚本（若存在）
 */
function syncFromSourceDirIfAvailable() {
  try {
    if (!ofs.existsSync(SOURCE_DIR_FILE)) return;
    const sourceDir = ofs.readFileSync(SOURCE_DIR_FILE, 'utf8').trim();
    if (!sourceDir || !ofs.existsSync(sourceDir)) return;

    const filesToSync = [
      'install_patch.js',
      'translations.js',
      'i18n_inject.js',
      'auto_heal_daemon.js',
    ];
    for (const file of filesToSync) {
      const src = path.join(sourceDir, file);
      const dst = path.join(PATCH_DATA_DIR, file);
      if (ofs.existsSync(src) && path.resolve(src) !== path.resolve(dst)) {
        const srcStat = ofs.statSync(src);
        const dstStat = ofs.existsSync(dst) ? ofs.statSync(dst) : null;
        if (!dstStat || srcStat.mtimeMs > dstStat.mtimeMs || srcStat.size !== dstStat.size) {
          ofs.copyFileSync(src, dst);
        }
      }
    }
  } catch {
    // 忽略同步异常
  }
}

/**
 * 生成 Windows 原生静默巡检脚本 auto_heal.vbs
 * 优势：
 * 1. 纯 ASCII 编码，100% 免疫 Windows GBK/UTF-8 代码页差异。
 * 2. 由系统 wscript.exe 执行，不占用 Antigravity.exe 文件句柄，不影响官方安装包覆盖更新。
 * 3. 1.5 秒高频轻量级元数据检测 + 文件写入稳定度检测，在官方安装器解压完 app.asar 后、启动客户端前瞬时完成自愈。
 */
function generateAutoHealVbs() {
  const escapedAsarPath = ASAR_PATH.replace(/"/g, '""');
  const escapedStateFile = STATE_FILE_PATH.replace(/"/g, '""');
  const escapedDaemonJs = path.join(PATCH_DATA_DIR, 'auto_heal_daemon.js').replace(/"/g, '""');
  const escapedAgExe = ANTIGRAVITY_EXE.replace(/"/g, '""');

  return `' Antigravity Chinese Patch - Silent Auto-Heal Daemon (auto_heal.vbs)
Option Explicit
On Error Resume Next

Dim fso, shell, asarPath, stateFile, daemonJs, agExe
Dim expectedSize, currentSize, lastFailedSize, failCount

Set fso = CreateObject("Scripting.FileSystemObject")
Set shell = CreateObject("WScript.Shell")

asarPath = "${escapedAsarPath}"
stateFile = "${escapedStateFile}"
daemonJs = "${escapedDaemonJs}"
agExe = "${escapedAgExe}"
lastFailedSize = ""
failCount = 0

Function ReadSavedSize()
  Err.Clear
  ReadSavedSize = ""
  If fso.FileExists(stateFile) Then
    Dim ts
    Set ts = fso.OpenTextFile(stateFile, 1, False)
    If Err.Number = 0 Then
      If Not ts.AtEndOfStream Then
        ReadSavedSize = Trim(ts.ReadAll())
      End If
      ts.Close
    End If
  End If
End Function

Function GetAsarSize()
  Err.Clear
  GetAsarSize = ""
  If fso.FileExists(asarPath) Then
    Dim f
    Set f = fso.GetFile(asarPath)
    If Err.Number = 0 Then
      GetAsarSize = CStr(f.Size)
    End If
  End If
End Function

Sub WaitForStableAsar()
  Dim prevSize, nowSize, i
  prevSize = GetAsarSize()
  For i = 1 To 12
    WScript.Sleep 500
    nowSize = GetAsarSize()
    If nowSize <> "" And nowSize = prevSize And CLng(nowSize) > 1000000 Then
      Exit Sub
    End If
    prevSize = nowSize
  Next
End Sub

Sub TriggerHeal()
  Err.Clear
  Dim cmd
  shell.Environment("Process")("ELECTRON_RUN_AS_NODE") = "1"
  If fso.FileExists(agExe) Then
    cmd = """" & agExe & """ """ & daemonJs & """ --once"
    shell.Run cmd, 0, True
  Else
    cmd = "node.exe """ & daemonJs & """ --once"
    shell.Run cmd, 0, True
  End If
End Sub

expectedSize = ReadSavedSize()
currentSize = GetAsarSize()
If currentSize <> "" And currentSize <> expectedSize Then
  Call WaitForStableAsar()
  Call TriggerHeal()
  expectedSize = ReadSavedSize()
End If

Do
  WScript.Sleep 1500
  Err.Clear
  currentSize = GetAsarSize()
  If currentSize <> "" And currentSize <> expectedSize Then
    expectedSize = ReadSavedSize()
    If currentSize <> expectedSize Then
      If currentSize = lastFailedSize And failCount >= 10 Then
        WScript.Sleep 15000
      Else
        Call WaitForStableAsar()
        Call TriggerHeal()
        expectedSize = ReadSavedSize()
        currentSize = GetAsarSize()
        If currentSize <> expectedSize Then
          If lastFailedSize = currentSize Then
            failCount = failCount + 1
          Else
            lastFailedSize = currentSize
            failCount = 1
          End If
        Else
          lastFailedSize = ""
          failCount = 0
        End If
      End If
    End If
  End If
Loop
`;
}

/**
 * 终止已有的 auto_heal.vbs 后台进程（避免重复运行）
 */
function stopRunningAutoHealDaemon() {
  if (process.platform !== 'win32') return;
  try {
    const psCmd = `Get-CimInstance Win32_Process -Filter "Name='wscript.exe' OR Name='cscript.exe'" | Where-Object { $_.CommandLine -like '*AntigravityChinesePatch*' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }`;
    spawnSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-WindowStyle', 'Hidden', '-Command', psCmd], {
      stdio: 'ignore',
      windowsHide: true,
      timeout: 5000,
    });
  } catch {
    // 忽略清理异常
  }
}

/**
 * 部署自愈守护文件并注册开机与实时后台监听
 */
function installAutoHealService(sourceDir = __dirname) {
  if (process.platform !== 'win32') return false;

  try {
    if (!ofs.existsSync(PATCH_DATA_DIR)) {
      ofs.mkdirSync(PATCH_DATA_DIR, { recursive: true });
    }

    if (sourceDir && path.resolve(sourceDir) !== path.resolve(PATCH_DATA_DIR)) {
      ofs.writeFileSync(SOURCE_DIR_FILE, path.resolve(sourceDir), 'utf8');
    }

    const filesToCopy = [
      'install_patch.js',
      'translations.js',
      'i18n_inject.js',
      'auto_heal_daemon.js',
    ];

    for (const file of filesToCopy) {
      const src = path.join(sourceDir, file);
      const dst = path.join(PATCH_DATA_DIR, file);
      if (ofs.existsSync(src) && path.resolve(src) !== path.resolve(dst)) {
        ofs.copyFileSync(src, dst);
      }
    }

    recordPatchedState(ASAR_PATH);
    ofs.writeFileSync(VBS_FILE_PATH, generateAutoHealVbs(), 'ascii');

    // 注册当前用户开机自启（无需管理员权限）
    const regCmd = `reg add "${REG_RUN_KEY}" /v "${REG_VALUE_NAME}" /t REG_SZ /d "wscript.exe //B \\"${VBS_FILE_PATH}\\"" /f`;
    execSync(regCmd, { stdio: 'ignore', windowsHide: true });

    // 启动后台静默守护进程（通过 WMI Win32_Process.Create 脱离当前终端 Job Object，防止终端关闭时连带终止守护进程）
    try {
      const escapedVbs = VBS_FILE_PATH.replace(/'/g, "''");
      const psCmd = `Get-CimInstance Win32_Process -Filter "Name='wscript.exe' OR Name='cscript.exe'" | Where-Object { $_.CommandLine -like '*AntigravityChinesePatch*' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }; $vbs = '${escapedVbs}'; $res = Invoke-CimMethod -ClassName Win32_Process -MethodName Create -Arguments @{ CommandLine = "wscript.exe //B \`"$vbs\`"" }; if (-not $res -or $res.ReturnValue -ne 0) { Start-Process -FilePath 'wscript.exe' -ArgumentList '//B', $vbs -WindowStyle Hidden }`;
      spawnSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-WindowStyle', 'Hidden', '-Command', psCmd], {
        stdio: 'ignore',
        windowsHide: true,
        timeout: 8000,
      });
    } catch {
      stopRunningAutoHealDaemon();
      const child = spawn('wscript.exe', ['//B', VBS_FILE_PATH], {
        detached: true,
        stdio: 'ignore',
        windowsHide: true,
      });
      child.unref();
    }

    appendLog('已成功安装/刷新版本更新自愈守护服务。');
    return true;
  } catch (err) {
    appendLog(`安装自愈服务失败: ${err.message}`);
    return false;
  }
}

/**
 * 卸载自愈守护服务、清理注册表项与持久化目录
 */
function uninstallAutoHealService() {
  if (process.platform !== 'win32') return;
  try {
    stopRunningAutoHealDaemon();
  } catch {}

  try {
    const regDelCmd = `reg delete "${REG_RUN_KEY}" /v "${REG_VALUE_NAME}" /f`;
    execSync(regDelCmd, { stdio: 'ignore', windowsHide: true });
  } catch {}

  try {
    if (ofs.existsSync(PATCH_DATA_DIR)) {
      ofs.rmSync(PATCH_DATA_DIR, { recursive: true, force: true });
    }
  } catch {}
}

/**
 * 执行单次检测并在发现 app.asar 未汉化时自动调用 install_patch.js 修复
 */
function checkAndHealOnce() {
  if (!ofs.existsSync(ASAR_PATH)) {
    return false;
  }
  if (isAsarPatchedRaw(ASAR_PATH)) {
    recordPatchedState(ASAR_PATH);
    return false;
  }

  syncFromSourceDirIfAvailable();
  appendLog('检测到 resources/app.asar 被更新为英文原版，正在自动重新应用中文汉化补丁...');
  const installScript = path.join(__dirname, 'install_patch.js');
  if (!ofs.existsSync(installScript)) {
    appendLog(`未找到安装脚本: ${installScript}`);
    return false;
  }

  const res = spawnSync(process.execPath, [installScript, '--auto-heal'], {
    env: {
      ...process.env,
      ELECTRON_RUN_AS_NODE: '1',
      ANTIGRAVITY_PATCH_NO_PAUSE: '1',
    },
    windowsHide: true,
    encoding: 'utf8',
    timeout: 30000,
  });

  if (res.status === 0) {
    recordPatchedState(ASAR_PATH);
    appendLog('自动重汉化成功！');
    return true;
  } else {
    appendLog(`自动重汉化失败 (退出码 ${res.status}): ${res.stderr || res.stdout || ''}`);
    return false;
  }
}

if (require.main === module) {
  if (process.argv.includes('--once')) {
    checkAndHealOnce();
    process.exit(0);
  } else {
    appendLog('Node 常驻自愈监听模式已启动');
    checkAndHealOnce();
    setInterval(() => {
      try {
        checkAndHealOnce();
      } catch {}
    }, 10000);
  }
}

module.exports = {
  PATCH_DATA_DIR,
  STATE_FILE_PATH,
  VBS_FILE_PATH,
  isAsarPatchedRaw,
  recordPatchedState,
  installAutoHealService,
  uninstallAutoHealService,
  checkAndHealOnce,
};
