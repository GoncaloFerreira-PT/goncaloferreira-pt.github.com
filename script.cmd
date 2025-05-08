@echo off
REM Script to find files and directories with excessively long names (Windows)

REM Define the maximum allowed length (adjust as needed)
set MAX_LENGTH=250

REM Get the current directory
set "CURRENT_DIR=%cd%"

echo Checking for paths longer than %MAX_LENGTH% characters in and below: %CURRENT_DIR%

REM Use PowerShell to find long paths (including files and directories)
powershell -NoProfile -Command "Get-ChildItem -Recurse | Where-Object {$_.FullName.Length -gt %MAX_LENGTH%} | ForEach-Object {$_.FullName + ' (' + $_.FullName.Length + ' characters) - Type: ' + (if ($_.PSIsContainer) {'Directory'} else {'File'})}"

echo.
echo Checking for long paths in the current directory itself:
powershell -NoProfile -Command "Get-ChildItem | Where-Object {$_.FullName.Length -gt %MAX_LENGTH%} | ForEach-Object {$_.FullName + ' (' + $_.FullName.Length + ' characters) - Type: ' + (if ($_.PSIsContainer) {'Directory'} else {'File'})}"

echo Finished checking. Any long paths found are listed above.
pause