#!/bin/bash

curl github.com

appId=$1
cronstring=$2
baseurl=$3

# Function to clean up temporary folders
function cleanup {
    # Do any necessary cleanup here
    rm -rf "$cloneDir"
    rm -rf "$outputDir"
    echo "Temporary folders are cleaned up."
}

# Task 1: Clone the GitHub repository
repoUrl="https://github.com/draco121/daemon.git"
branchName="diagsensei/dev"
cloneDir="/tmp/daemon_repo"

git clone --branch "$branchName" "$repoUrl" "$cloneDir"

# Task 2: Replace placeholders in constants.go with input arguments
constantsFilePath="$cloneDir/utils/constants.go"
constantsContent=$(<"$constantsFilePath")
constantsContent="${constantsContent//\{\{appid\}\}/$appId}"
constantsContent="${constantsContent//\{\{cronstring\}\}/$cronstring}"
constantsContent="${constantsContent//\{\{baseurl\}\}/$baseurl}"
echo "$constantsContent" > "$constantsFilePath"

# Task 3: Build application for Linux and Windows
outputDir="/tmp/build_output"
mkdir -p "$outputDir"
linuxOutputDir="$outputDir/linux"
windowsOutputDir="$outputDir/windows"

# Build for Linux
pushd "$cloneDir"
mkdir -p "$linuxOutputDir"
export GOOS="linux"
export GOARCH="amd64"
go build -o "$linuxOutputDir/${appId}_linux"

# Build for Windows
mkdir -p "$windowsOutputDir"
export GOOS="windows"
export GOARCH="amd64"
go build -o "$windowsOutputDir/${appId}_windows.exe"

popd

echo "Builds are created successfully."

# Task 4: Move built binaries to the final output directory
finalOutputDir="/home/daemonbuilds/$appId"
mkdir -p "$finalOutputDir"

cp "$linuxOutputDir/${appId}_linux" "$finalOutputDir/app_linux"
cp "$windowsOutputDir/${appId}_windows.exe" "$finalOutputDir/app_windows.exe"

echo "Build binaries are moved to the final output directory: $finalOutputDir"

# Clean up temporary folders
cleanup
