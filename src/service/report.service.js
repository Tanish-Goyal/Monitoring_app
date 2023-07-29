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

  getReportList: async (appId, page, limit,bundleStatus, hostName) => {
    var filterObject = {};
    if ( hostName == undefined){
      if( bundleStatus == undefined){
        filterObject = {appId:appId};
      }
      else{
        filterObject = {appId:appId, bundleStatus:bundleStatus};
      }
    }
    else {
      if( bundleStatus == undefined){
        filterObject = {appId:appId, hostName:hostName};
      }
      else{
        filterObject = {appId:appId, bundleStatus:bundleStatus, hostName:hostName};
      }
    }
    const reportsRawData = await ReportModel.aggregate([
      {
        $match: filterObject,
      },
      {
        $facet: {
          totalCount: [{ $count: 'count' }],
          reportList: [{ $skip: page }, { $limit: limit }],
        },
      },
    ]);

    const reportsFinalData = {
      count: reportsRawData[0].totalCount[0]?.count || 0,
      reportList: reportsRawData[0].reportList
    } 

    return reportsFinalData;
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
