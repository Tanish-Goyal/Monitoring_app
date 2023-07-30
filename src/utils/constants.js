const fs = require('fs-extra');
const path = require('path');
const config = require('./config')
const os = require('os')
const Constants = {
    uploadPath: async()=>{
        await fs.ensureDir(config.UPLOAD_PATH)
        return config.UPLOAD_PATH
    },
    getBundlePath: (bundlename)=>{
        return path.join(config.UPLOAD_PATH,bundlename)
    },
    getProcessedPath: async(bundlename) => {
        const tokens = bundlename.split('.')
        const processedPath = path.join(config.PROCESSED_PATH,tokens[0])
        await fs.ensureDir(processedPath);
        return processedPath;
    },

    getBuildCommand: (appId,cronstring,baseurl)=>{
        if(os.platform() == 'win32'){
            // eslint-disable-next-line no-undef
            var scriptPath = `${__dirname}/scripts/build-daemon.ps1`;
            var command =`pwsh -ExecutionPolicy Bypass -File ${scriptPath} -appId "${appId}" -cronstring "${cronstring}" -baseurl "${baseurl}"`;
            return command
        }else{
            // eslint-disable-next-line no-undef
            scriptPath = `${__dirname}/scripts/build-daemon.sh`;
            command =`${scriptPath} ${appId} ${cronstring} ${baseurl}`;
            return command
        }
        
    }
}

module.exports = Constants;