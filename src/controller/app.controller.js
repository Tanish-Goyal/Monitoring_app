// eslint-disable-next-line new-cap
const router = require('express').Router();
const logger = require('../utils/logger');
const jwtUtils = require('../utils/jwt-utils');
const appService = require('../service/app.service');

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

router.put('', async (req, res)=>{
  try {
    const appInfo = req.body;
    await appService.createApp(appInfo);
    res.sendStatus(201);
  } catch (err) {
    logger.error(err);
    res.status(500).send(err.message);
  }
});

router.delete('/:appId', async (req, res)=>{
  try {
    const appId = req.params.appId;
    await appService.deleteApp(appId);
    res.sendStatus(204);
  } catch (err) {
    logger.error(err);
    res.status(500).send(err.message);
  }
});

router.get("/:appId", async(req,res)=>{
    try{
        var appId = req.params.appId;
        var app = await appService.getApp(appId)
        res.json(app)
    }catch(err){
        logger.error(err);
        res.status(500).send(err.message);
    }
});

router.get("/:projectId",async(req,res)=>{
    try{
        var projectId = req.params.projectId;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        var projects = await appService.getAppList(projectId, page, limit)
        res.json(projects)
    }catch(err){
        logger.error(err);
        res.status(500).send(err.message);
    }
});

module.exports = router;
