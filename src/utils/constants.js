const fs = require('fs-extra');
const path = require('path');
const config = require('./config')
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
    }
}

module.exports = Constants;