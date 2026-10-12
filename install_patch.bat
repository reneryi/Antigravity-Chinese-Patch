@echo off
setlocal
chcp 65001 >nul 2>&1

set "ANTIGRAVITY_EXE=%LOCALAPPDATA%\Programs\Antigravity\Antigravity.exe"
if not exist "%ANTIGRAVITY_EXE%" (
  echo ERROR: Antigravity.exe was not found.
  echo Expected path: "%ANTIGRAVITY_EXE%"
  set "PATCH_EXIT=1"
  goto :finish
)

set "ELECTRON_RUN_AS_NODE=1"
"%ANTIGRAVITY_EXE%" "%~dp0install_patch.js" %*
set "PATCH_EXIT=%ERRORLEVEL%"
if defined TEMP for /d %%D in ("%TEMP%\antigravity-zh-*") do if exist "%%~fD\" rmdir /s /q "%%~fD" >nul 2>&1

:finish
echo.
if not defined ANTIGRAVITY_PATCH_NO_PAUSE pause
endlocal & exit /b %PATCH_EXIT%
