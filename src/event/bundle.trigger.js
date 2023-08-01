const logger = require('../utils/logger');
const config = require('../utils/config');
const pool = require('../workers/workers.interface');
const reportService = require('../service/report.service');
const path = require('path')

const redisClient = require('redis').createClient({
  url: config.REDIS_URL
})
redisClient.connect()
const onMessage = (bundleName) => {
  try{
    pool.exec('untar',[bundleName]).always(async ()=>{
      bundleName = path.parse(bundleName).name;
      bundleName = path.parse(bundleName).name;
      await reportService.updateReportStatus(bundleName,"processed")
    })
  }catch(err){
    logger.error(err)
  }
};
const newBundleNotifierSub = (channel)=>{
  try {
    logger.info(`attempting to subscribe to channel 
    ${channel} in updatefeed trigger` );
    redisClient.subscribe(channel, onMessage);
    logger.info(`channel ${channel } subscribed successfully`);
  } catch (err) {
    logger.error(`error occured while subscribing to 
    channel ${channel} :${err}`);
  }
};

module.exports = newBundleNotifierSub;
