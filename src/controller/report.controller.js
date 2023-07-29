const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const jwtUtils = require('../utils/jwt-utils');
const reportService = require('../service/report.service');

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

router.put('', async (req, res) => {
  try {
    const reportData = req.body;
    await reportService.createReport(reportData);
    res.sendStatus(201);
  } catch (err) {
    logger.error(err);
    res.status(500).send(err.message);
  }
});

router.get('', async (req, res) => {
  try {
    const appId = req.query.appId || null;
    const bundleStatus = req.query.bundleStatus || undefined;
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const reports = await reportService.getReportList(appId, page, limit, bundleStatus);
    res.json(reports);
  } catch (err) {
    logger.error(err);
    res.status(500).send(err.message);
  }
});

router.delete('/:reportId', async (req, res) => {
  try {
    const reportId = req.params.reportId;
    await reportService.deleteReport(reportId);
    res.sendStatus(204);
  } catch (err) {
    logger.error(err);
    res.status(500).send(err.message);
  }
});

router.get('/hosts', async (req, res) => {
  try {
    const appId = req.query.appId || null;
    const hostnameList = await reportService.getUniqueHostNames(appId);
    
    const hostsInfo = {
      "hostnameList": hostnameList,
      "count": hostnameList.length
    };
    res.json(hostsInfo);

  } catch (err) {
    logger.error(err);
    res.status(500).send(err.message);
  }
});

router.get('/hosts/:hostname', async (req, res) => {
  try {
    const hostname = req.params.hostname;
    const bundleStatus = req.query.bundleStatus || undefined;
    const appId = req.query.appId || null;
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const reports = await reportService.getReportList(appId, page, limit, bundleStatus, hostname);
    res.json(reports);

  } catch (err) {
    logger.error(err);
    res.status(500).send(err.message);
  }
}
);

router.get('/:reportId', async (req, res) => {
  try {
    const reportId = req.params.reportId;
    const report = await reportService.getReport(reportId);
    res.json(report);
  } catch (err) {
    logger.error(err);
    res.status(500).send(err.message);
  }
});

module.exports = router;
