param (
    [string]$appId,
    [string]$cronstring,
    [string]$baseurl
)

# Function to clean up temporary folders
function Cleanup {
    try {
        # Do any necessary cleanup here
        Remove-Item -Path $cloneDir -Recurse -Force
        Remove-Item -Path $outputDir -Recurse -Force
        Write-Host "Temporary folders are cleaned up."
    } catch {
        Write-Host "Error during cleanup: $_"
    }
}

# Task 1: Clone the GitHub repository
$repoUrl = "https://github.com/draco121/daemon.git"
$branchName = "diagsensei/dev"
$cloneDir = "$env:TEMP\daemon_repo"

git clone $repoUrl -b $branchName $cloneDir

# Task 2: Replace placeholders in constants.go with input arguments
$constantsFilePath = Join-Path $cloneDir "utils\constants.go"
$constantsContent = Get-Content -Path $constantsFilePath
$constantsContent = $constantsContent -replace "{{appid}}", $appId -replace "{{cronstring}}", $cronstring -replace "{{baseurl}}", $baseurl
$constantsContent | Set-Content -Path $constantsFilePath

# Task 3: Build application for Linux and Windows
$outputDir = "$env:TEMP\build_output"
mkdir -Force $outputDir
$linuxOutputDir = Join-Path $outputDir "linux"
$windowsOutputDir = Join-Path $outputDir "windows"

try {
    # Build for Linux
    Set-Location $cloneDir
    mkdir -Force $linuxOutputDir
    $env:GOOS = "linux"
    $env:GOARCH = "amd64"
    go build -o (Join-Path $linuxOutputDir "($appId)_linux")

    # Build for Windows
    mkdir -Force $windowsOutputDir
    $env:GOOS = "windows"
    $env:GOARCH = "amd64"
    go build -o (Join-Path $windowsOutputDir "($appId)_windows.exe")

    Write-Host "Builds are created successfully."

    # Task 4: Move built binaries to the final output directory
    $finalOutputDir = "C:\daemonbuilds\$appId"
    mkdir -Force $finalOutputDir

    Copy-Item -Path (Join-Path $linuxOutputDir "($appId)_linux") -Destination (Join-Path $finalOutputDir "app_linux")
    Copy-Item -Path (Join-Path $windowsOutputDir "($appId)_windows.exe") -Destination (Join-Path $finalOutputDir "app_windows.exe")

    Write-Host "Build binaries are moved to the final output directory: $finalOutputDir"
} finally {
    # Change back to the parent directory and clean up temporary folders
    Set-Location $PSScriptRoot
    Cleanup
}
