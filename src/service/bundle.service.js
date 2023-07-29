const redisClient = require('../database/redis');
const channels = require('../utils/channels');

const bundleservice = {
    bundleUploadNotifier: async (bundleName)=>{
        //processService.untar(bundleName)
        await redisClient.publish(channels.newBundleNotifierChannel,bundleName);
    }
}

module.exports = bundleservice;