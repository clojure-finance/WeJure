# Check if IPFS daemon is running
$ipfsProcess = Get-Process -Name "ipfs" -ErrorAction SilentlyContinue

if ($ipfsProcess -eq $null) {
    Write-Host "Starting IPFS daemon..."
    Start-Process -FilePath "ipfs.exe" -ArgumentList "daemon" -WindowStyle Minimized
} else {
    Write-Host "IPFS daemon is already running."
}

# Start Gun relay server in a new PowerShell window
$gunRelayPath = Join-Path -Path (Get-Location) -ChildPath "src\wejure\js"
Write-Host "Starting Gun relay server..."
Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "-Command", "cd `"$gunRelayPath`"; node relay"

# Start WeJure development server in a new PowerShell window
$wejurePath = (Get-Location).Path
Write-Host "Starting WeJure development server..."
Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "-Command", "cd `"$wejurePath`"; yarn dev"

Write-Host "WeJure is running, please visit http://localhost:8020 to enjoy!"