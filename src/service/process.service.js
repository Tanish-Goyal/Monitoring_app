const fs = require('fs-extra');
const constants = require('../utils/constants');
//const logger = require('../utils/logger');
const zlib = require('zlib');
//const path = require('path')
const tar = require('tar');
//const reportService = require('../service/report.service');

const processService = {
    untar: async (bundlename) => {
        try {
            var bundlePath = constants.getBundlePath(bundlename);
            var destDir = await constants.getProcessedPath(bundlename);
            fs.createReadStream(bundlePath)
                .pipe(zlib.createGunzip()) // Uncompress the .gz file
                .pipe(tar.extract({ cwd: destDir })) // Extract the tar contents to the specified directory
                .on('error', (err) => {
                    console.error('Error occurred while untarring the file:', err);
                })
                .on('finish', async () => {
                    // bundlePath = path.parse(bundlePath).name;
                    // bundlePath = path.parse(bundlePath).name;
                    // await reportService.updateReportStatus(bundlePath,"processed")
                    console.info('File successfully untarred.');
                });
        } catch (e) {
            console.error(e.message);
        }
    }
}

module.exports = processService;