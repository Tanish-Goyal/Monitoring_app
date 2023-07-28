const unzipper = require('unzipper');
const fs = require('fs-extra');
const constants = require('../utils/constants');
const logger = require('../utils/logger');

const processService = {
    untar: async (bundlename) => {
        try{
            if(bundlename.endsWith('tar.gz')){
                await fs.createReadStream(constants.getBundlePath(bundlename)).pipe(unzipper.Extract({ path: constants.getProcessedPath(bundlename) })).promise();
            }
        }catch(e){
            logger.error(e.message);
        }
    }
}

module.exports = processService;