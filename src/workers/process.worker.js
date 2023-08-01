const fs = require('fs-extra');
const constants = require('../utils/constants');
const logger = require('../utils/logger');
const zlib = require('zlib');
const tar = require('tar');
const workerpool = require('workerpool');


const processService = {
    untar: async (bundlename) => {
        try {
            var bundlePath = constants.getBundlePath(bundlename);
            var destDir = await constants.getProcessedPath(bundlename);
            fs.createReadStream(bundlePath)
                .pipe(zlib.createGunzip()) // Uncompress the .gz file
                .pipe(tar.extract({ cwd: destDir })) // Extract the tar contents to the specified directory
                .on('error', (err) => {
                    logger.error('Error occurred while untarring the file:', err);
                })
                .on('finish',() => {
                    logger.info('File successfully untarred.');
                });
        } catch (e) {
            logger.error(e.message);
        }
    }
}

workerpool.worker({
    untar: processService.untar,
  });