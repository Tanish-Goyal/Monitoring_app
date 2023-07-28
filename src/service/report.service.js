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
  },
  
  getUniqueHostNames: async (appId) => {
  
    const uniqueHostNames = await ReportModel.aggregate([
      {
        $match: { appId: appId }, // match result with appId
      },
      {
        $group: {
          _id: '$hostName', // group by the 'hostName' field
        },
      },
      {
        $project: {
          _id: 0, // Exclude the '_id' field from the output
          hostName: '$_id', // Rename the '_id' field to 'hostName'
        },
      },
    ]);
  },

  getReportsByHostName: async (appId, hostName, page, limit) => {
    const reports = await ReportModel.find({appId:appId,hostName:hostName}).skip((page-1)*limit).limit(limit).exec();
    return reports;
  },

};

module.exports = reportService;
