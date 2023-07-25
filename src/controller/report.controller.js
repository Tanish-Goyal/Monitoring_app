const express = require('express');
const router = express.Router();
const reportService = require('../service/report.service');

router.put('/', async (req, res) => {
  try {
    const reportData = req.body;
    await reportService.createReport(reportData);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

router.delete('/:reportId', async (req, res) => {
  try {
    const reportId = req.params.reportId;
    await reportService.deleteReport(reportId);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

router.get('/:reportId', async (req, res) => {
  try {
    const reportId = req.params.reportId;
    const report = await reportService.getReport(reportId);
    res.json(report);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

router.get('/', async (req, res) => {
  try {
    // eslint-disable-next-line no-undef
    const appId = parseInt(req.query.appId) || None;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const reports = await reportService.getReportList(appId, page, limit);
    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

module.exports = router;
