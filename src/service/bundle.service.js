const redisClient = require('../database/redis')
const rediskeys = require('../utils/redis.keys');
const processService = require('./process.service');

const bundleservice = {
    bundleUploadNotifier: async (bundleName)=>{
        processService.untar(bundleName)
        //await redisClient.publish(rediskeys.freshBundles(),bundleName);
    }
}

module.exports = bundleservice;