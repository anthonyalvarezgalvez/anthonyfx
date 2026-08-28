@echo off
setlocal

rem Always serve the website copy located beside this launcher.
set "SITE_DIR=%~dp0"
cd /d "%SITE_DIR%" || (
  echo ERROR: Could not open the website folder:
  echo %SITE_DIR%
  pause
  exit /b 1
)

rem Prefer the Windows Python launcher, with python.exe as a fallback.
where py >nul 2>&1
if not errorlevel 1 (
  set "PYTHON_CMD=py"
) else (
  where python >nul 2>&1
  if errorlevel 1 (
    echo ERROR: Python was not found. Install Python and try again.
    pause
    exit /b 1
  )
  set "PYTHON_CMD=python"
)

rem Pick the first free local port so another server cannot be opened by mistake.
for /L %%P in (8001,1,8010) do (
  netstat -ano | findstr /R /C:":%%P .*LISTENING" >nul
  if errorlevel 1 (
    set "PORT=%%P"
    goto :port_found
  )
)

echo ERROR: No free port was found between 8000 and 8010.
pause
exit /b 1

:port_found
echo Serving: %SITE_DIR%
echo Local URL: http://127.0.0.1:%PORT%/
rem The current directory is already SITE_DIR. Using "." also avoids the
rem trailing backslash in %%~dp0 being misread by Windows command parsing.
start "Anthony FX Local Server" /min %PYTHON_CMD% -m http.server %PORT% --bind 127.0.0.1 --directory "."
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:%PORT%/"

endlocal
