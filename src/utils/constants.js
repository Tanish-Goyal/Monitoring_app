const fs = require('fs-extra');
const path = require('path');
const config = require('config')
const Constants = {
    uploadPath: ()=>{
        fs.ensureDir(config.UPLOAD_PATH)
        return config.UPLOAD_PATH
    },
    getBundlePath: (bundlename)=>{
        return path.join(config.UPLOAD_PATH,bundlename)
    },
    getProcessedPath: (bundlename) => {
        tokens = bundlename.split('.')
        const processedPath = fs.ensureDir(path.join(config.PROCESSED_PATH,tokens[0]));
        return processedPath;
    }
}

module.exports = Constants;