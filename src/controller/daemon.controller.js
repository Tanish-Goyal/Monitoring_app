// eslint-disable-next-line new-cap
const router = require('express').Router();
const logger = require('../utils/logger');
const jwtUtils = require('../utils/jwt-utils');
const { exec } = require('child_process');
const path = require('path');
const config = require('../utils/config')
const fs = require('fs-extra');
const Constants = require('../utils/constants');
router.use((req, res, next) => {
    try {
      const token = req.headers.authorization;
      const userinfo = jwtUtils.validateToken(token);
      if (userinfo) {
        // Log an info message for each incoming request
        logger.info(`Received a request for ${req.url} from ${userinfo.userId}`);
        next();
      } else {
        res.status(401).send();
      }
    } catch (err) {
      res.status(401).send(err.message);
    }
  });

router.get("/download/:appId", async(req,res)=>{
    try{
        const { appId } = req.params;
        const { platform } = req.query;
        var appName = ""
        if(platform == "linux"){
            appName = "app_linux"
        }
        if(platform == "windows"){
            appName = "app_windows.exe"
        }
        const fileLocation = path.join(`${config.DAEMON_PATH}/${appId}`,appName);
      
        fs.access(fileLocation, fs.constants.F_OK, (err) => {
          if (err) {
            return res.status(404).json({ error: 'File not found.' });
          }
      
          const fileStream = fs.createReadStream(fileLocation);
      
          fileStream.on('open', () => {
            res.setHeader('Content-Type', 'application/octet-stream');
            res.setHeader('Content-Disposition', `attachment; filename=${appId}-${appName}`);
            fileStream.pipe(res);
          });
      
          fileStream.on('error', () => {
            res.status(500).json({ error: 'Failed to download the file.' });
          });
        });
    }catch(err){
        logger.error(err);
        res.status(500).send(err.message);
    }
});

router.post("/build/:appId",async(req,res)=>{
    try{
        const appId = req.params.appId;
        const { cronstring } = req.body;
        const baseurl = req.headers.host
        const command = Constants.getBuildCommand(appId,cronstring,baseurl)
        exec(command, (error, stdout, stderr) => {
            if (error) {
              logger.error(`Error occurred: ${error.message}`);
              return res.sendStatus(501);
            }
            // Process the output from the script
            logger.info(`Script output: ${stdout}`);
          
            if (stderr) {
              logger.error(`Script errors: ${stderr}`);
            }
          
            logger.info('Script execution completed successfully.');
            res.sendStatus(201);
          });
    }catch(err){
        logger.error(err);
        res.status(500).send(err.message);
    }
});



module.exports = router;
