/**
 * Antigravity 中文汉化补丁 - 版本更新同步事务代理与 NTFS 目录联接守护模块 (auto_heal_daemon.js v3.6)
 *
 * 架构说明：
 * 1. 针对软件内自动更新（“重启以更新” / quitAndInstall）：
 *    由主进程 child_process.spawn 钩子将更新任务转交同步串行事务代理 update_runner.vbs 执行：
 *    - Step 1：等待旧版 Antigravity.exe / language_server 完全退出并释放句柄；
 *    - Step 2：以 `--updated /S` 静默阻塞模式运行官方 NSIS 安装器（阻断 oneClick.nsh 的 IfSilent 0 +3 非静默强行拉起英文原版行为）；
 *    - Step 3：零句柄占用下通过 robocopy /E /MOVE 将新版本极速迁移回目标盘（如 E 盘）并重建 mklink /J；
 *    - Step 4：内存级极速刷新 app.asar.backup 并注入最新中文汉化补丁，随后彻底清除进程级 ELECTRON_RUN_AS_NODE 环境变量；
 *    - Step 5：确定性拉起全中文的新版 Antigravity.exe --updated。
 * 2. 针对官网独立安装包覆盖更新（auto_heal.vbs 后台常驻巡检）：
 *    - 所有 VBScript Sub/Function 均显式声明过程级 On Error Resume Next，彻底消除文件锁探测时的 Error 70 异常中断；
 *    - 与 update_runner.vbs 通过内核级 runner.lock 互斥协同，互不抢锁。
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
const LS_EXE = path.join(
  RESOURCES_DIR,
  'app',
  'extensions',
  'antigravity',
  'bin',
  'language_server_windows_x64.exe'
);
const UNINSTALL_EXE = path.join(ANTIGRAVITY_DIR, 'Uninstall Antigravity.exe');

const PATCH_DATA_DIR = path.join(
  process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming'),
  'AntigravityChinesePatch'
);
const STATE_FILE_PATH = path.join(PATCH_DATA_DIR, 'patched_state.txt');
const SOURCE_DIR_FILE = path.join(PATCH_DATA_DIR, 'source_dir.txt');
const JUNCTION_TARGET_FILE = path.join(PATCH_DATA_DIR, 'junction_target.txt');
const ACTIVE_INSTALLER_FILE = path.join(PATCH_DATA_DIR, 'active_installer.txt');
const RELAUNCH_FLAG_FILE = path.join(PATCH_DATA_DIR, 'relaunch_requested.flag');
const UPDATE_TASK_FILE = path.join(PATCH_DATA_DIR, 'update_task.txt');
const DAEMON_LOCK_FILE = path.join(PATCH_DATA_DIR, 'daemon.lock');
const RUNNER_LOCK_FILE = path.join(PATCH_DATA_DIR, 'runner.lock');
const LOG_FILE_PATH = path.join(PATCH_DATA_DIR, 'auto_heal.log');
const VBS_FILE_PATH = path.join(PATCH_DATA_DIR, 'auto_heal.vbs');
const UPDATE_RUNNER_VBS_PATH = path.join(PATCH_DATA_DIR, 'update_runner.vbs');
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
 * 检测指定文件是否被运行中的进程或互斥锁占用（不修改文件内容与时间戳）
 */
function isFileLocked(filePath) {
  try {
    if (!filePath || !ofs.existsSync(filePath)) return false;
    const fd = ofs.openSync(filePath, 'r+');
    ofs.closeSync(fd);
    return false;
  } catch (err) {
    if (err && (err.code === 'EBUSY' || err.code === 'EPERM' || err.code === 'EACCES')) {
      return true;
    }
    return false;
  }
}

/**
 * 判断目录是否为 NTFS 目录联接 (Junction) 或符号链接
 */
function isDirectoryJunction(dirPath) {
  try {
    if (!ofs.existsSync(dirPath)) return false;
    const lstat = ofs.lstatSync(dirPath);
    if (lstat.isSymbolicLink()) return true;
    const real = ofs.realpathSync(dirPath).replace(/^\\\\\?\\/, '');
    return path.resolve(real).toLowerCase() !== path.resolve(dirPath).toLowerCase();
  } catch {
    return false;
  }
}

/**
 * 自动探测并保存用户的跨盘 NTFS 目录联接目标路径（例如 E:\AntigravityData\Programs\antigravity）
 */
function detectAndSaveJunctionTarget(explicitTarget = null) {
  try {
    if (!ofs.existsSync(PATCH_DATA_DIR)) {
      ofs.mkdirSync(PATCH_DATA_DIR, { recursive: true });
    }

    let target = null;

    // 1. 显式传入的目标路径优先
    if (explicitTarget && typeof explicitTarget === 'string') {
      const cleaned = path.resolve(explicitTarget.trim());
      if (cleaned.toLowerCase() !== path.resolve(ANTIGRAVITY_DIR).toLowerCase()) {
        target = cleaned;
      }
    }

    // 2. 若当前安装目录本身就是有效的 Junction，直接读取其真实目标路径
    if (!target && isDirectoryJunction(ANTIGRAVITY_DIR)) {
      const real = ofs.realpathSync(ANTIGRAVITY_DIR).replace(/^\\\\\?\\/, '');
      if (path.resolve(real).toLowerCase() !== path.resolve(ANTIGRAVITY_DIR).toLowerCase()) {
        target = path.resolve(real);
      }
    }

    // 3. 读取已持久化的 junction_target.txt 配置
    if (!target && ofs.existsSync(JUNCTION_TARGET_FILE)) {
      const saved = ofs.readFileSync(JUNCTION_TARGET_FILE, 'utf8').trim();
      if (saved && path.resolve(saved).toLowerCase() !== path.resolve(ANTIGRAVITY_DIR).toLowerCase()) {
        target = path.resolve(saved);
      }
    }

    // 4. 从关联的 %APPDATA%\Antigravity 目录联接推导（如 E:\AntigravityData\Roaming\Antigravity -> E:\AntigravityData\Programs\antigravity）
    if (!target) {
      const roamingAg = path.join(
        process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming'),
        'Antigravity'
      );
      if (isDirectoryJunction(roamingAg)) {
        const realRoaming = ofs.realpathSync(roamingAg).replace(/^\\\\\?\\/, '');
        const candidate1 = path.join(path.dirname(path.dirname(realRoaming)), 'Programs', 'antigravity');
        const candidate2 = path.join(path.dirname(realRoaming), 'Programs', 'antigravity');
        if (ofs.existsSync(candidate1) || ofs.existsSync(path.dirname(candidate1))) {
          target = path.resolve(candidate1);
        } else if (ofs.existsSync(candidate2)) {
          target = path.resolve(candidate2);
        }
      }
    }

    // 5. 扫描非系统盘常见的 AntigravityData\Programs\antigravity 目录
    if (!target) {
      const drives = ['D', 'E', 'F', 'G', 'H'];
      for (const d of drives) {
        const candidate = `${d}:\\AntigravityData\\Programs\\antigravity`;
        if (ofs.existsSync(candidate)) {
          target = candidate;
          break;
        }
      }
    }

    if (target && path.resolve(target).toLowerCase() !== path.resolve(ANTIGRAVITY_DIR).toLowerCase()) {
      ofs.writeFileSync(JUNCTION_TARGET_FILE, target, 'utf8');
      return target;
    }
  } catch {
    // 忽略探测异常
  }
  return null;
}

/**
 * 检查并在条件允许时立即修复 NTFS 目录联接
 * 返回值:
 * - { status: 'unconfigured', target: null }
 * - { status: 'already_junction', target }
 * - { status: 'deferred_to_daemon', target }（当前 Antigravity 正在运行，已交由守护进程/更新代理在软件关闭或重启时自动恢复）
 * - { status: 'repaired', target }
 * - { status: 'failed', target, error }
 */
function ensureDirectoryJunction(explicitTarget = null) {
  const target = detectAndSaveJunctionTarget(explicitTarget);
  if (!target) {
    return { status: 'unconfigured', target: null };
  }

  if (isDirectoryJunction(ANTIGRAVITY_DIR)) {
    return { status: 'already_junction', target };
  }

  const execInAgDir = path
    .resolve(process.execPath)
    .toLowerCase()
    .startsWith(path.resolve(ANTIGRAVITY_DIR).toLowerCase());

  if (
    execInAgDir ||
    isFileLocked(ANTIGRAVITY_EXE) ||
    isFileLocked(LS_EXE) ||
    isFileLocked(UNINSTALL_EXE)
  ) {
    return { status: 'deferred_to_daemon', target };
  }

  try {
    if (!ofs.existsSync(target)) {
      ofs.mkdirSync(target, { recursive: true });
    }

    if (ofs.existsSync(ANTIGRAVITY_DIR)) {
      spawnSync(
        'robocopy.exe',
        [
          ANTIGRAVITY_DIR,
          target,
          '/E',
          '/MOVE',
          '/XF',
          'app.asar.old',
          '/R:3',
          '/W:1',
          '/MT:8',
          '/NFL',
          '/NDL',
          '/NJH',
          '/NJS',
        ],
        {
          cwd: PATCH_DATA_DIR,
          stdio: 'ignore',
          windowsHide: true,
          timeout: 120000,
        }
      );

      if (ofs.existsSync(ANTIGRAVITY_DIR) && !isDirectoryJunction(ANTIGRAVITY_DIR)) {
        if (!isFileLocked(ANTIGRAVITY_EXE) && !isFileLocked(LS_EXE)) {
          spawnSync('cmd.exe', ['/d', '/c', `rd /s /q "${ANTIGRAVITY_DIR}"`], {
            cwd: PATCH_DATA_DIR,
            stdio: 'ignore',
            windowsHide: true,
          });
        }
      }
    }

    if (!ofs.existsSync(ANTIGRAVITY_DIR)) {
      spawnSync('cmd.exe', ['/d', '/c', `mklink /J "${ANTIGRAVITY_DIR}" "${target}"`], {
        cwd: PATCH_DATA_DIR,
        stdio: 'ignore',
        windowsHide: true,
      });
    }

    if (isDirectoryJunction(ANTIGRAVITY_DIR)) {
      appendLog(`已成功恢复 NTFS 目录联接: ${ANTIGRAVITY_DIR} -> ${target}`);
      return { status: 'repaired', target };
    }
    return { status: 'failed', target, error: '无法移除原目录或创建 mklink /J' };
  } catch (err) {
    return { status: 'failed', target, error: err.message };
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
 * 生成 auto_heal.vbs 与 update_runner.vbs 共用的纯 ASCII 基础函数库
 * 关键工程约束：
 * 1. VBScript 的 On Error Resume Next 仅在当前过程作用域有效，绝不会继承到子函数！
 *    因此每一个 Sub / Function 第一行必须显式声明 On Error Resume Next。
 * 2. VBScript 的 And / Or 不具备短路求值特性，严禁在同一行对可能为空的字符串调用 CDbl/CLng。
 * 3. 调用 ELECTRON_RUN_AS_NODE=1 执行单次重汉化后，必须立即通过 procEnv.Remove 清除该环境变量，
 *    防止后续拉起 Antigravity.exe 时退化为无界面的后台 Node 进程。
 */
function generateSharedVbsHelpers() {
  return `Sub WriteVbsLog(msg)
  On Error Resume Next
  Err.Clear
  Dim ts
  Set ts = fso.OpenTextFile(logFile, 8, True)
  If Err.Number = 0 Then
    ts.WriteLine "[" & Now() & "] [VBS] " & msg
    ts.Close
  End If
  Err.Clear
End Sub

Function ReadTextFile(filePath)
  On Error Resume Next
  Err.Clear
  ReadTextFile = ""
  If fso.FileExists(filePath) Then
    Dim ts
    Set ts = fso.OpenTextFile(filePath, 1, False)
    If Err.Number = 0 Then
      If Not ts.AtEndOfStream Then
        ReadTextFile = Trim(ts.ReadAll())
      End If
      ts.Close
    End If
  End If
  Err.Clear
End Function

Function IsFileLocked(filePath)
  On Error Resume Next
  Err.Clear
  IsFileLocked = False
  If filePath <> "" Then
    If fso.FileExists(filePath) Then
      Dim ts
      Set ts = fso.OpenTextFile(filePath, 8, False)
      If Err.Number <> 0 Then
        IsFileLocked = True
        Err.Clear
      Else
        ts.Close
      End If
    End If
  End If
  Err.Clear
End Function

Function IsAppRunning()
  On Error Resume Next
  Err.Clear
  IsAppRunning = False
  If IsFileLocked(agExe) Then
    IsAppRunning = True
    Exit Function
  End If
  If IsFileLocked(lsExe) Then
    IsAppRunning = True
    Exit Function
  End If
  Err.Clear
End Function

Function IsJunction(folderPath)
  On Error Resume Next
  Err.Clear
  IsJunction = False
  If fso.FolderExists(folderPath) Then
    Dim fld
    Set fld = fso.GetFolder(folderPath)
    If Err.Number = 0 Then
      If (fld.Attributes And 1024) <> 0 Then
        IsJunction = True
      End If
    End If
  End If
  Err.Clear
End Function

Function GetAsarSize()
  On Error Resume Next
  Err.Clear
  GetAsarSize = ""
  If fso.FileExists(asarPath) Then
    Dim f
    Set f = fso.GetFile(asarPath)
    If Err.Number = 0 Then
      GetAsarSize = CStr(f.Size)
    End If
  End If
  Err.Clear
End Function

Sub WaitForStableAsar()
  On Error Resume Next
  Err.Clear
  Dim prevSize, nowSize, i
  prevSize = GetAsarSize()
  For i = 1 To 20
    WScript.Sleep 300
    nowSize = GetAsarSize()
    If nowSize <> "" Then
      If nowSize = prevSize Then
        If CDbl(nowSize) > 1000000 Then
          Err.Clear
          Exit Sub
        End If
      End If
    End If
    prevSize = nowSize
  Next
  Err.Clear
End Sub

Sub RepairJunctionIfNeeded()
  On Error Resume Next
  Err.Clear
  Dim targetDir, retry
  targetDir = ReadTextFile(junctionFile)
  If targetDir = "" Then Exit Sub
  If LCase(targetDir) = LCase(agDir) Then Exit Sub
  If Not fso.FolderExists(agDir) Then
    If fso.FolderExists(targetDir) Then
      shell.Run "cmd.exe /d /c mklink /J """ & agDir & """ """ & targetDir & """", 0, True
      If IsJunction(agDir) Then
        Call WriteVbsLog("Restored missing NTFS Directory Junction: " & agDir & " -> " & targetDir)
      End If
    End If
    Err.Clear
    Exit Sub
  End If
  If IsJunction(agDir) Then Exit Sub
  If IsAppRunning() Then Exit Sub
  If IsFileLocked(uninstExe) Then Exit Sub
  Call WaitForStableAsar()
  If IsAppRunning() Then Exit Sub
  If IsFileLocked(uninstExe) Then Exit Sub

  Call WriteVbsLog("Detected unlinked installation directory. Migrating " & agDir & " -> " & targetDir)
  If Not fso.FolderExists(targetDir) Then
    shell.Run "cmd.exe /d /c mkdir """ & targetDir & """", 0, True
  End If
  For retry = 1 To 15
    If IsJunction(agDir) Then Exit For
    If fso.FolderExists(agDir) Then
      shell.Run "robocopy.exe """ & agDir & """ """ & targetDir & """ /E /MOVE /XF app.asar.old /R:2 /W:1 /MT:8 /NFL /NDL /NJH /NJS", 0, True
      If fso.FolderExists(agDir) Then
        If Not IsJunction(agDir) Then
          shell.Run "cmd.exe /d /c rd /s /q """ & agDir & """", 0, True
        End If
      End If
    End If
    If Not fso.FolderExists(agDir) Then
      shell.Run "cmd.exe /d /c mklink /J """ & agDir & """ """ & targetDir & """", 0, True
    End If
    If IsJunction(agDir) Then
      Call WriteVbsLog("Successfully restored NTFS Directory Junction: " & agDir & " -> " & targetDir)
      Exit For
    End If
    WScript.Sleep 300
  Next
  Err.Clear
End Sub

Sub TriggerHeal()
  On Error Resume Next
  Err.Clear
  Dim procEnv, cmd
  Set procEnv = shell.Environment("Process")
  procEnv("ELECTRON_RUN_AS_NODE") = "1"
  procEnv("ANTIGRAVITY_PATCH_NO_PAUSE") = "1"
  If fso.FileExists(agExe) Then
    cmd = """" & agExe & """ """ & daemonJs & """ --once"
    shell.Run cmd, 0, True
  Else
    cmd = "node.exe """ & daemonJs & """ --once"
    shell.Run cmd, 0, True
  End If
  procEnv.Remove "ELECTRON_RUN_AS_NODE"
  procEnv.Remove "ANTIGRAVITY_PATCH_NO_PAUSE"
  Err.Clear
End Sub`;
}

/**
 * 生成软件内自动更新同步串行事务代理脚本 update_runner.vbs
 * 彻底解决 NSIS oneClick.nsh 在非静默模式下通过 `IfSilent 0 +3` 无视 `--force-run` 剥离、
 * 0ms 强行拉起英文原版 Antigravity.exe 并锁死 C 盘目录联接的架构问题。
 */
function generateUpdateRunnerVbs() {
  return `' Antigravity Chinese Patch - Synchronous Update Transaction Proxy (update_runner.vbs v3.6)
Option Explicit
On Error Resume Next

Dim fso, shell, appData, localAppData, patchDir, agDir, asarPath, stateFile, junctionFile
Dim installerFile, relaunchFile, taskFile, runnerLockFile, daemonLockFile, autoHealVbs, logFile
Dim daemonJs, agExe, lsExe, uninstExe, runnerLockStream, lockTry

Set fso = CreateObject("Scripting.FileSystemObject")
Set shell = CreateObject("WScript.Shell")

appData = shell.ExpandEnvironmentStrings("%APPDATA%")
localAppData = shell.ExpandEnvironmentStrings("%LOCALAPPDATA%")
patchDir = fso.BuildPath(appData, "AntigravityChinesePatch")
agDir = fso.BuildPath(localAppData, "Programs\\antigravity")
asarPath = fso.BuildPath(agDir, "resources\\app.asar")
stateFile = fso.BuildPath(patchDir, "patched_state.txt")
junctionFile = fso.BuildPath(patchDir, "junction_target.txt")
installerFile = fso.BuildPath(patchDir, "active_installer.txt")
relaunchFile = fso.BuildPath(patchDir, "relaunch_requested.flag")
taskFile = fso.BuildPath(patchDir, "update_task.txt")
runnerLockFile = fso.BuildPath(patchDir, "runner.lock")
daemonLockFile = fso.BuildPath(patchDir, "daemon.lock")
autoHealVbs = fso.BuildPath(patchDir, "auto_heal.vbs")
logFile = fso.BuildPath(patchDir, "auto_heal.log")
daemonJs = fso.BuildPath(patchDir, "auto_heal_daemon.js")
agExe = fso.BuildPath(agDir, "Antigravity.exe")
lsExe = fso.BuildPath(agDir, "resources\\app\\extensions\\antigravity\\bin\\language_server_windows_x64.exe")
uninstExe = fso.BuildPath(agDir, "Uninstall Antigravity.exe")

If fso.FolderExists(patchDir) Then
  shell.CurrentDirectory = patchDir
End If

' Single-instance runner mutex
For lockTry = 1 To 10
  Err.Clear
  Set runnerLockStream = fso.OpenTextFile(runnerLockFile, 8, True)
  If Err.Number = 0 Then Exit For
  WScript.Sleep 200
Next
If Err.Number <> 0 Then
  WScript.Quit 0
End If

${generateSharedVbsHelpers()}

Sub ExecuteUpdateTransaction()
  On Error Resume Next
  Err.Clear
  Dim rawTask, lines, lineCount, installerExe, shouldRelaunch, extraArgs, initialDelayMs, forceCloseApp
  Dim waitTick, instCmd, instExitCode, curSize, expSize, cleanEnv

  rawTask = ReadTextFile(taskFile)
  If rawTask = "" Then
    Call WriteVbsLog("[Runner] Invoked without update_task.txt; exiting.")
    Exit Sub
  End If

  rawTask = Replace(rawTask, vbCrLf, vbLf)
  rawTask = Replace(rawTask, vbCr, vbLf)
  lines = Split(rawTask, vbLf)
  lineCount = UBound(lines)

  installerExe = ""
  shouldRelaunch = "1"
  extraArgs = ""
  initialDelayMs = 0
  forceCloseApp = "0"

  If lineCount >= 0 Then installerExe = Trim(lines(0))
  If lineCount >= 1 Then
    If Trim(lines(1)) = "0" Then shouldRelaunch = "0"
  End If
  If lineCount >= 2 Then extraArgs = Trim(lines(2))
  If lineCount >= 3 Then
    If IsNumeric(Trim(lines(3))) Then initialDelayMs = CLng(Trim(lines(3)))
  End If
  If lineCount >= 4 Then forceCloseApp = Trim(lines(4))

  If initialDelayMs > 0 Then
    Call WriteVbsLog("[Runner] Waiting initial delay " & CStr(initialDelayMs) & "ms before executing transaction...")
    WScript.Sleep initialDelayMs
  End If

  If forceCloseApp = "1" Then
    Call WriteVbsLog("[Runner] Closing running Antigravity processes for Junction/patch switchover...")
    shell.Run "taskkill.exe /IM Antigravity.exe /T /F", 0, True
    shell.Run "taskkill.exe /IM language_server_windows_x64.exe /T /F", 0, True
  End If

  ' Step 1: Wait for old Antigravity processes to completely exit and release handles
  For waitTick = 1 To 80
    If Not IsAppRunning() Then Exit For
    WScript.Sleep 250
  Next
  If IsAppRunning() Then
    Call WriteVbsLog("[Runner] Old Antigravity still holding handles after 20s; forcing clean termination.")
    shell.Run "taskkill.exe /IM Antigravity.exe /T /F", 0, True
    shell.Run "taskkill.exe /IM language_server_windows_x64.exe /T /F", 0, True
    For waitTick = 1 To 20
      If Not IsAppRunning() Then Exit For
      WScript.Sleep 250
    Next
  End If
  WScript.Sleep 400

  ' Step 2: Execute official NSIS installer synchronously in silent (/S) mode without --force-run
  If installerExe <> "" Then
    If UCase(installerExe) <> "SKIP_INSTALL" Then
      If fso.FileExists(installerExe) Then
        instCmd = """" & installerExe & """ --updated /S"
        If extraArgs <> "" Then
          instCmd = instCmd & " " & extraArgs
        End If
        Call WriteVbsLog("[Runner] Starting silent NSIS update: " & instCmd)
        instExitCode = shell.Run(instCmd, 0, True)
        Call WriteVbsLog("[Runner] Silent NSIS update finished with exit code: " & CStr(instExitCode))
        For waitTick = 1 To 120
          If Not IsFileLocked(installerExe) Then
            If Not IsFileLocked(uninstExe) Then Exit For
          End If
          WScript.Sleep 500
        Next
        Call WaitForStableAsar()
      Else
        Call WriteVbsLog("[Runner] Warning: installer file missing: " & installerExe)
      End If
    Else
      Call WriteVbsLog("[Runner] SKIP_INSTALL mode: proceeding directly to Junction restore and Chinese patch.")
    End If
  End If

  ' Defense-in-depth: if any custom installer ever spawned an unpatched Antigravity prematurely, close it immediately
  If IsAppRunning() Then
    Call WriteVbsLog("[Runner] Closing prematurely spawned unpatched Antigravity before Junction restore + Chinese heal.")
    shell.Run "taskkill.exe /IM Antigravity.exe /T /F", 0, True
    shell.Run "taskkill.exe /IM language_server_windows_x64.exe /T /F", 0, True
    For waitTick = 1 To 20
      If Not IsAppRunning() Then Exit For
      WScript.Sleep 250
    Next
    shouldRelaunch = "1"
  End If

  ' Step 3: Deterministically restore cross-drive NTFS Directory Junction (mklink /J)
  Call RepairJunctionIfNeeded()

  ' Step 4: Inject Chinese localization patch into the newly installed app.asar
  curSize = GetAsarSize()
  expSize = ReadTextFile(stateFile)
  If curSize <> "" Then
    If expSize = "" Or curSize <> expSize Then
      Call TriggerHeal()
    End If
  End If

  ' Step 5: Clean transaction state, scrub Node env vars, and launch localized Antigravity
  If fso.FileExists(taskFile) Then fso.DeleteFile taskFile, True
  If fso.FileExists(installerFile) Then fso.DeleteFile installerFile, True
  If fso.FileExists(relaunchFile) Then fso.DeleteFile relaunchFile, True
  Err.Clear

  Set cleanEnv = shell.Environment("Process")
  cleanEnv.Remove "ELECTRON_RUN_AS_NODE"
  cleanEnv.Remove "ANTIGRAVITY_PATCH_NO_PAUSE"
  Err.Clear

  If shouldRelaunch = "1" Then
    If fso.FileExists(agExe) Then
      Call WriteVbsLog("[Runner] Update transaction complete (Junction=" & CStr(IsJunction(agDir)) & ", AsarSize=" & GetAsarSize() & "). Launching localized Antigravity.exe")
      If fso.FolderExists(agDir) Then
        shell.CurrentDirectory = agDir
      End If
      shell.Run """" & agExe & """ --updated", 1, False
      If fso.FolderExists(patchDir) Then
        shell.CurrentDirectory = patchDir
      End If
    End If
  Else
    Call WriteVbsLog("[Runner] Silent update on quit complete (relaunch not requested).")
  End If

  If fso.FileExists(autoHealVbs) Then
    If Not IsFileLocked(daemonLockFile) Then
      shell.Run "wscript.exe //B """ & autoHealVbs & """", 0, False
    End If
  End If
  Err.Clear
End Sub

Call ExecuteUpdateTransaction()
runnerLockStream.Close
WScript.Quit 0
`;
}

/**
 * 生成后台常驻静默巡检脚本 auto_heal.vbs（兜底守护官网独立安装包覆盖更新与日常异常修复）
 */
function generateAutoHealVbs() {
  return `' Antigravity Chinese Patch - Silent Auto-Heal & NTFS Junction Guardian (auto_heal.vbs v3.6)
Option Explicit
On Error Resume Next

Dim fso, shell, appData, localAppData, patchDir, agDir, asarPath, stateFile, junctionFile
Dim installerFile, relaunchFile, lockFile, runnerLockFile, logFile, daemonJs, agExe, lsExe, uninstExe
Dim lockStream, expectedSize, currentSize, lastFailedSize, failCount

Set fso = CreateObject("Scripting.FileSystemObject")
Set shell = CreateObject("WScript.Shell")

appData = shell.ExpandEnvironmentStrings("%APPDATA%")
localAppData = shell.ExpandEnvironmentStrings("%LOCALAPPDATA%")
patchDir = fso.BuildPath(appData, "AntigravityChinesePatch")
agDir = fso.BuildPath(localAppData, "Programs\\antigravity")
asarPath = fso.BuildPath(agDir, "resources\\app.asar")
stateFile = fso.BuildPath(patchDir, "patched_state.txt")
junctionFile = fso.BuildPath(patchDir, "junction_target.txt")
installerFile = fso.BuildPath(patchDir, "active_installer.txt")
relaunchFile = fso.BuildPath(patchDir, "relaunch_requested.flag")
lockFile = fso.BuildPath(patchDir, "daemon.lock")
runnerLockFile = fso.BuildPath(patchDir, "runner.lock")
logFile = fso.BuildPath(patchDir, "auto_heal.log")
daemonJs = fso.BuildPath(patchDir, "auto_heal_daemon.js")
agExe = fso.BuildPath(agDir, "Antigravity.exe")
lsExe = fso.BuildPath(agDir, "resources\\app\\extensions\\antigravity\\bin\\language_server_windows_x64.exe")
uninstExe = fso.BuildPath(agDir, "Uninstall Antigravity.exe")
lastFailedSize = ""
failCount = 0

If fso.FolderExists(patchDir) Then
  shell.CurrentDirectory = patchDir
End If

' Single-instance kernel file lock
Err.Clear
Set lockStream = fso.OpenTextFile(lockFile, 8, True)
If Err.Number <> 0 Then
  WScript.Quit 0
End If

${generateSharedVbsHelpers()}

Function IsInstallerRunning()
  On Error Resume Next
  Err.Clear
  IsInstallerRunning = False
  Dim instPath
  instPath = ReadTextFile(installerFile)
  If instPath <> "" Then
    If IsFileLocked(instPath) Then
      IsInstallerRunning = True
      Exit Function
    End If
  End If
  If IsFileLocked(uninstExe) Then
    IsInstallerRunning = True
    Exit Function
  End If
  If instPath <> "" Then
    If Not IsFileLocked(agExe) Then
      fso.DeleteFile installerFile, True
      Err.Clear
    End If
  End If
  Err.Clear
End Function

Sub CheckRelaunchIfRequested()
  On Error Resume Next
  Err.Clear
  If IsFileLocked(runnerLockFile) Then Exit Sub
  If Not fso.FileExists(relaunchFile) Then Exit Sub
  If IsInstallerRunning() Then Exit Sub
  If IsAppRunning() Then Exit Sub
  Dim targetDir
  targetDir = ReadTextFile(junctionFile)
  If targetDir <> "" Then
    If LCase(targetDir) <> LCase(agDir) Then
      If Not IsJunction(agDir) Then Exit Sub
    End If
  End If
  Dim curSize, expSize, cleanEnv
  curSize = GetAsarSize()
  expSize = ReadTextFile(stateFile)
  If curSize = "" Or expSize = "" Or curSize <> expSize Then Exit Sub
  fso.DeleteFile relaunchFile, True
  Err.Clear
  Set cleanEnv = shell.Environment("Process")
  cleanEnv.Remove "ELECTRON_RUN_AS_NODE"
  cleanEnv.Remove "ANTIGRAVITY_PATCH_NO_PAUSE"
  Err.Clear
  If fso.FileExists(agExe) Then
    Call WriteVbsLog("Update + Junction restore + Chinese patch complete. Relaunching Antigravity.exe")
    If fso.FolderExists(agDir) Then
      shell.CurrentDirectory = agDir
    End If
    shell.Run """" & agExe & """", 1, False
    If fso.FolderExists(patchDir) Then
      shell.CurrentDirectory = patchDir
    End If
  End If
  Err.Clear
End Sub

Sub RunCheckCycle()
  On Error Resume Next
  Err.Clear
  ' Yield completely while synchronous update_runner.vbs transaction is active
  If IsFileLocked(runnerLockFile) Then Exit Sub
  If IsInstallerRunning() Then Exit Sub

  ' Stage 1: Restore cross-drive NTFS Directory Junction if broken and app is not running
  Call RepairJunctionIfNeeded()

  ' Stage 2: Check and heal app.asar Chinese localization patch
  currentSize = GetAsarSize()
  expectedSize = ReadTextFile(stateFile)
  If currentSize <> "" Then
    If currentSize <> expectedSize Then
      If currentSize = lastFailedSize And failCount >= 10 Then
        WScript.Sleep 10000
      Else
        Call WaitForStableAsar()
        If Not IsFileLocked(runnerLockFile) Then
          If Not IsInstallerRunning() Then
            Call TriggerHeal()
            expectedSize = ReadTextFile(stateFile)
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
    End If
  End If

  ' Stage 3: Fallback relaunch if requested and update_runner is not active
  Call CheckRelaunchIfRequested()
  Err.Clear
End Sub

Call RunCheckCycle()

Do
  WScript.Sleep 1500
  Call RunCheckCycle()
Loop
`;
}

/**
 * 终止已有的 auto_heal.vbs 后台常驻进程（不干扰正在执行更新事务的 update_runner.vbs）
 */
function stopRunningAutoHealDaemon(includeRunner = false) {
  if (process.platform !== 'win32') return;
  try {
    const pattern = includeRunner ? '*AntigravityChinesePatch*' : '*auto_heal.vbs*';
    const psCmd = `Get-CimInstance Win32_Process -Filter "Name='wscript.exe' OR Name='cscript.exe'" | Where-Object { $_.CommandLine -like '${pattern}' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }`;
    spawnSync(
      'powershell.exe',
      ['-NoProfile', '-NonInteractive', '-WindowStyle', 'Hidden', '-Command', psCmd],
      {
        cwd: PATCH_DATA_DIR,
        stdio: 'ignore',
        windowsHide: true,
        timeout: 5000,
      }
    );
  } catch {
    // 忽略清理异常
  }
}

/**
 * 检查后台 auto_heal.vbs 守护进程是否正在运行（通过内核级 daemon.lock 文件锁在 0.05ms 内判定）
 */
function isAutoHealDaemonRunning() {
  return isFileLocked(DAEMON_LOCK_FILE);
}

/**
 * 启动 auto_heal.vbs 后台静默进程并验证其存活状态
 */
function startAutoHealDaemonProcess() {
  if (process.platform !== 'win32' || !ofs.existsSync(VBS_FILE_PATH)) return false;

  if (isAutoHealDaemonRunning()) return true;

  try {
    const escapedVbs = VBS_FILE_PATH.replace(/'/g, "''");
    const escapedDir = PATCH_DATA_DIR.replace(/'/g, "''");
    const psCmd = [
      `$vbs = '${escapedVbs}'`,
      `$dir = '${escapedDir}'`,
      `$cmd = 'wscript.exe //B "' + $vbs + '"'`,
      `$res = Invoke-CimMethod -ClassName Win32_Process -MethodName Create -Arguments @{ CommandLine = $cmd; CurrentDirectory = $dir }`,
      `if (-not $res -or $res.ReturnValue -ne 0) { Start-Process -FilePath 'wscript.exe' -ArgumentList '//B', $vbs -WorkingDirectory $dir -WindowStyle Hidden }`,
    ].join('; ');
    spawnSync(
      'powershell.exe',
      ['-NoProfile', '-NonInteractive', '-WindowStyle', 'Hidden', '-Command', psCmd],
      {
        cwd: PATCH_DATA_DIR,
        stdio: 'ignore',
        windowsHide: true,
        timeout: 6000,
      }
    );
  } catch {}

  for (let i = 0; i < 6; i++) {
    if (isAutoHealDaemonRunning()) return true;
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100);
  }

  try {
    const child = spawn('wscript.exe', ['//B', VBS_FILE_PATH], {
      cwd: PATCH_DATA_DIR,
      detached: true,
      stdio: 'ignore',
      windowsHide: true,
    });
    if (child && typeof child.unref === 'function') child.unref();
  } catch {}

  for (let i = 0; i < 6; i++) {
    if (isAutoHealDaemonRunning()) return true;
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100);
  }

  return isAutoHealDaemonRunning();
}

/**
 * 部署同步更新事务代理 (update_runner.vbs) 与后台常驻守护服务 (auto_heal.vbs)
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

    detectAndSaveJunctionTarget();

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

    // 若当前没有正在执行的更新事务，清理历史残留标记文件
    if (!isFileLocked(RUNNER_LOCK_FILE)) {
      for (const staleFile of [ACTIVE_INSTALLER_FILE, RELAUNCH_FLAG_FILE, UPDATE_TASK_FILE]) {
        if (ofs.existsSync(staleFile)) {
          try {
            ofs.unlinkSync(staleFile);
          } catch {}
        }
      }
    }

    // 写入新版同步更新事务代理与后台巡检脚本
    stopRunningAutoHealDaemon(false);
    ofs.writeFileSync(UPDATE_RUNNER_VBS_PATH, generateUpdateRunnerVbs(), 'ascii');
    ofs.writeFileSync(VBS_FILE_PATH, generateAutoHealVbs(), 'ascii');

    // 注册当前用户开机自启（无需管理员权限）
    const regCmd = `reg add "${REG_RUN_KEY}" /v "${REG_VALUE_NAME}" /t REG_SZ /d "wscript.exe //B \\"${VBS_FILE_PATH}\\"" /f`;
    execSync(regCmd, { stdio: 'ignore', windowsHide: true });

    const started = startAutoHealDaemonProcess();
    appendLog(`已成功部署同步更新事务代理 (update_runner.vbs) 与目录联接守护服务 (daemonRunning=${started})。`);
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
    stopRunningAutoHealDaemon(true);
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
  ensureDirectoryJunction();

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
    cwd: PATCH_DATA_DIR,
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
  if (process.argv.includes('--repair-junction')) {
    const res = ensureDirectoryJunction();
    console.log(JSON.stringify(res));
    process.exit(0);
  } else if (process.argv.includes('--once')) {
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
  JUNCTION_TARGET_FILE,
  ACTIVE_INSTALLER_FILE,
  RELAUNCH_FLAG_FILE,
  UPDATE_TASK_FILE,
  DAEMON_LOCK_FILE,
  RUNNER_LOCK_FILE,
  VBS_FILE_PATH,
  UPDATE_RUNNER_VBS_PATH,
  generateAutoHealVbs,
  generateUpdateRunnerVbs,
  isFileLocked,
  isDirectoryJunction,
  detectAndSaveJunctionTarget,
  ensureDirectoryJunction,
  isAutoHealDaemonRunning,
  isAsarPatchedRaw,
  recordPatchedState,
  installAutoHealService,
  uninstallAutoHealService,
  checkAndHealOnce,
};
