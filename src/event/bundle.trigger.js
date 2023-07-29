const logger = require('../utils/logger');
const config = require('../utils/config')
const redisClient = require('redis').createClient({
  url: config.REDIS_URL
})
redisClient.connect()
const processService = require('../service/process.service');
const reportService = require('../service/report.service');
const onMessage = async (bundleName) => {
  try{
    await processService.untar(bundleName);
    reportService.updateReportStatus(bundleName,"processed")
  }catch(err){
    logger.error(err)
  }
};
const newBundleNotifierSub =(channel)=>{
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
