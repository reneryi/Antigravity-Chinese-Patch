@echo off
setlocal
cd /d "%~dp0"
set "ANTIGRAVITY_PATCH_NO_PAUSE=1"

if "%~1"=="" (
  call "%~dp0install_patch.bat"
) else (
  call "%~dp0install_patch.bat" "--junction-target=%~1"
)

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$patchDir = Join-Path $env:APPDATA 'AntigravityChinesePatch';" ^
  "$juncFile = Join-Path $patchDir 'junction_target.txt';" ^
  "$runner = Join-Path $patchDir 'update_runner.vbs';" ^
  "if (-not (Test-Path $juncFile)) { Write-Error 'No NTFS Junction target detected. Usage: repair_junction.bat \"D:\Path\To\antigravity\"'; exit 1 };" ^
  "$taskFile = Join-Path $patchDir 'update_task.txt';" ^
  "[System.IO.File]::WriteAllText($taskFile, \"SKIP_INSTALL`r`n1`r`n`r`n0`r`n1\", [System.Text.Encoding]::ASCII);" ^
  "Start-Process -FilePath 'wscript.exe' -ArgumentList '//B', $runner -WorkingDirectory $patchDir -Wait"

endlocal
