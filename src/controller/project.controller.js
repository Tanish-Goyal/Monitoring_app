// eslint-disable-next-line new-cap
const router = require('express').Router();
const logger = require('../utils/logger');
const jwtUtils = require('../utils/jwt-utils');
const projectService = require('../service/project.service');

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
    const token = req.headers.authorization;
    const userinfo = jwtUtils.validateToken(token);
    const projectInfo = req.body;
    const projectId = await projectService.createProject(projectInfo,userinfo.userId);
    res.status(201).send(projectId);
  } catch (err) {
    logger.error(err);
    res.status(500).send(err.message);
  }
});

router.delete('/:projectId', async (req, res)=>{
  try {
    const projectId = req.params.projectId;
    await projectService.deleteProject(projectId);
    res.sendStatus(204);
  } catch (err) {
    logger.error(err);
    res.status(500).send(err.message);
  }
});

router.get("/:projectId", async(req,res)=>{
    try{
        var projectId = req.params.projectId;
        var project = await projectService.getProject(projectId)
        res.json(project)
    }catch(err){
        logger.error(err);
        res.status(500).send(err.message);
    }
});

router.get("",async(req,res)=>{
    try{
        const token = req.headers.authorization;
        const userInfo = jwtUtils.validateToken(token);
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        var projects = await projectService.getProjectList(userInfo.userId, page, limit)
        res.json(projects)
    }catch(err){
        logger.error(err);
        res.status(500).send(err.message);
    }
})



module.exports = router;
