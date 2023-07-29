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
  
  getUniqueHostNames: async (appId) => {
  
    const uniqueHostNames = await ReportModel.aggregate([
      {
        $match: { appId: appId },
      },
      {
        $group: {
          _id: null,
          hostNames: { $addToSet: '$hostName' },
        }
      },
    ]);    
    return uniqueHostNames[0].hostNames;
  },

  getReportList: async (appId, page, limit, hostName) => {
    
    if ( hostName == undefined){
      var reports = await ReportModel.find({appId:appId}).skip(page).limit(limit).exec();
    }
    else {
      var reports = await ReportModel.find({appId:appId,hostName:hostName}).skip(page).limit(limit).exec();
    }

    return reports;
  },
  
  updateReportStatus: async (bundleName, newStatus) => {
  
      const updatedReport = await ReportModel.findOneAndUpdate(
        { 
          bundleName: bundleName
        },
        { 
          $set: { status: newStatus }
        },
        { 
          new: true
        }
      );
    
      return updatedReport;
    } 
  
};

module.exports = reportService;
