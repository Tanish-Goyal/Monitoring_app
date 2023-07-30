#!/bin/bash

# Function to clean up temporary folders
cleanup() {
    if [[ -d "$cloneDir" ]]; then
        rm -rf "$cloneDir"
    fi
    if [[ -d "$outputDir" ]]; then
        rm -rf "$outputDir"
    fi
    echo "Temporary folders are cleaned up."
}

# Task 1: Clone the GitHub repository
repoUrl="https://github.com/draco121/daemon.git"
branchName="diagsensei/dev"
cloneDir="/tmp/daemon_repo"

git clone -b "$branchName" "$repoUrl" "$cloneDir" || { echo "Failed to clone the repository."; exit 1; }

# Task 2: Replace placeholders in constants.go with input arguments
constantsFilePath="$cloneDir/utils/constants.go"
appId="$1"
cronstring="$2"
baseurl="$3"

sed -i "s/{{appid}}/$appId/g" "$constantsFilePath"
sed -i "s/{{cronstring}}/$cronstring/g" "$constantsFilePath"
sed -i "s,{{baseurl}},$baseurl,g" "$constantsFilePath"

# Task 3: Build application for Linux and Windows
outputDir="/tmp/build_output"
mkdir -p "$outputDir/linux" "$outputDir/windows"

# Build for Linux
cd "$cloneDir" || { echo "Failed to change directory."; exit 1; }
mkdir -p "$outputDir/linux"
GOOS=linux GOARCH=amd64 go build -o "$outputDir/linux/app_linux" main.go || { echo "Failed to build for Linux."; cleanup; exit 1; }

# Build for Windows
mkdir -p "$outputDir/windows"
GOOS=windows GOARCH=amd64 go build -o "$outputDir/windows/app_windows.exe" main.go || { echo "Failed to build for Windows."; cleanup; exit 1; }

echo "Builds are created successfully."

# Task 4: Move built binaries to the final output directory
finalOutputDir="/home/daemonbuilds/$appId"
mkdir -p "$finalOutputDir"

cp "$outputDir/linux/app_linux" "$finalOutputDir/app_linux"
cp "$outputDir/windows/app_windows.exe" "$finalOutputDir/app_windows.exe"

echo "Build binaries are moved to the final output directory: $finalOutputDir"

# Clean up temporary folders
cleanup
