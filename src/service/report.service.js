const ReportModel = require('../model/report.model');

const reportService = {
  createReport: async (reportData) => {
    const report = new ReportModel(reportData);
    await report.save();
  },

  deleteReport: async (reportId) => {
    await ReportModel.findByIdAndDelete(reportId);
  },

  getReport: async (reportId) => {
    const report = await ReportModel.findById(reportId);
    return report;
  },
  
  getReportList: async (appId, page, limit) => {
    const reports = await ReportModel.find({appId:appId}).skip((page-1)*limit).limit(limit).exec();
    return reports;
  }
//   GET /specs?page=1&limit=10
};

module.exports = reportService;
