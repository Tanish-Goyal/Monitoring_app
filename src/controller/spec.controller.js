const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const jwtUtils = require('../utils/jwt-utils');
const specService = require('../service/spec.service');

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

router.put('/', async (req, res) => {
  try {
    const specInfo = req.body;
    await specService.createSpec(specInfo);
    res.sendStatus(201);
  } catch (err) {
    logger.error(err);
    res.status(500).send(err.message);
  }
});

router.delete('/:specId', async (req, res) => {
  try {
    const specId = req.params.specId;
    await specService.deleteSpec(specId);
    res.sendStatus(204);
  } catch (err) {
    logger.error(err);
    res.status(500).send(err.message);
  }
});

router.get('/:specId', async (req, res) => {
  try {
    const specId = req.params.specId;
    const spec = await specService.getSpec(specId);
    res.json(spec);
  } catch (err) {
    logger.error(err);
    res.status(500).send(err.message);
  }
});

// router.get('/', async (req, res) => {
//   try {
//     const specs = await specService.getSpecList();
//     res.json(specs);
//   } catch (err) {
//     logger.error(err);
//     res.status(500).send(err.message);
//   }
// });

module.exports = router;
