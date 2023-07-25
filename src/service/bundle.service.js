const redisClient = require('../database/redis')
const rediskeys = require('../utils/redis.keys')

const bundleservice = {
    bundleUploadNotifier: async (bundleName)=>{
        await redisClient.publish(rediskeys.freshBundles(),bundleName);
    }
}

module.exports = bundleservice;