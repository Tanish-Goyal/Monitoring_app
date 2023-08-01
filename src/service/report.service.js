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
      { $group: { _id: '$hostName' } },
      { $project: { _id: 0, hostName: '$_id' } }
    ])   
    const hostNames = uniqueHostNames.map(item => item.hostName);
    return hostNames;
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
  
  getRecentReports: async (appId, numberOfReports, hostName) => {
    var filterObject = {};

    if( hostName == undefined){
      filterObject = {appId:appId};
    }
    else{
      filterObject = {appId:appId,hostName:hostName};
    }

    const reports = await ReportModel.find(filterObject).sort({_id:-1}).limit(numberOfReports).exec();
    
    return reports;
  },

  updateReportStatus: async (bundleName, newStatus) => {
      await ReportModel.findOneAndUpdate(
        { 
          bundleName: bundleName
        },
        { 
          $set: { bundleStatus: newStatus }
        },
        { 
          new: true
        }
      );
    } 
  
};

module.exports = reportService;
