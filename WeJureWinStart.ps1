# define the IPFS version and download URL
$IPFS_URL = "https://dist.ipfs.tech/kubo/v0.30.0/kubo_v0.30.0_windows-amd64.zip"
$IPFS_ZIP = "kubo_v0.30.0.zip"
$IPFS_INSTALL_DIR = "$env:USERPROFILE\Apps\kubo_v0.30.0"
$IPFS_BIN_DIR = "$IPFS_INSTALL_DIR\kubo"

# create the installation directory
Write-Host "directory: $IPFS_INSTALL_DIR"
New-Item -ItemType Directory -Force -Path $IPFS_INSTALL_DIR

# download IPFS
Write-Host "downloading IPFS..."
Invoke-WebRequest -Uri $IPFS_URL -OutFile $IPFS_ZIP
# unzip IPFS
Write-Host "unzipping IPFS..."
Expand-Archive -Path $IPFS_ZIP -DestinationPath $IPFS_INSTALL_DIR -Force
# check the unzipped files
Write-Host "checking the unzipped files..."
Get-ChildItem -Path $IPFS_INSTALL_DIR

# check the IPFS executable
if (Test-Path "$IPFS_INSTALL_DIR\ipfs.exe") {
    $IPFS_BIN_DIR = "$IPFS_INSTALL_DIR"
} elseif (Test-Path "$IPFS_INSTALL_DIR\kubo\ipfs.exe") {
    $IPFS_BIN_DIR = "$IPFS_INSTALL_DIR\kubo"
} else {
    Write-Host "IPFS executable not found!"
    exit 1
}

# add IPFS to the PATH
Write-Host "adding IPFS to the PATH..."
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";$IPFS_BIN_DIR", [EnvironmentVariableTarget]::User)
$env:Path += ";$IPFS_BIN_DIR"

# test IPFS installation
Write-Host "testing IPFS installation..."
ipfs --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "IPFS installation failed! Please check the installation steps."
    exit 1
}

# initialize IPFS
Write-Host "initializing IPFS..."
ipfs init

# configure IPFS API CORS
Write-Host "configuring IPFS API CORS..."
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:8020", "http://localhost:5001", "https://webui.ipfs.io"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST"]'

# start IPFS daemon
Write-Host "starting IPFS daemon..."
$NodeJS_URL = "https://nodejs.org/dist/v18.18.1/node-v18.18.1-x64.msi"
$NodeJS_Installer = "node-v18.18.1-x64.msi"
Invoke-WebRequest -Uri $NodeJS_URL -OutFile $NodeJS_Installer

Write-Host "installing Node.js..."
Start-Process -FilePath msiexec.exe -ArgumentList "/i `"$NodeJS_Installer`" /quiet /norestart" -Wait

# update the PATH environment variable
Write-Host "updating the PATH environment variable..."
$pathUser = [Environment]::GetEnvironmentVariable("Path", [EnvironmentVariableTarget]::User)
$pathMachine = [Environment]::GetEnvironmentVariable("Path", [EnvironmentVariableTarget]::Machine)
$env:Path = "$pathUser;$pathMachine"

[Environment]::SetEnvironmentVariable("Path", $env:Path, [EnvironmentVariableTarget]::Process)

# test Node.js installation
Write-Host "testing Node.js installation..."
node -v
if ($LASTEXITCODE -ne 0) {
    Write-Host "Node.js installation failed! Please check the installation steps."
    exit 1
}

# install Yarn
Write-Host "installing Yarn..."
npm install -g yarn

# test Yarn installation
Write-Host "testing Yarn installation..."
yarn -v
if ($LASTEXITCODE -ne 0) {
    Write-Host "Yarn installation failed! Please check the installation steps."
    exit 1
}

# install WeJure
Write-Host "installing WeJure..."
yarn install

# test WeJure installation
Write-Host "crypt-js installation..."
npm install crypto-js

Write-Host "WeJure installation completed!"