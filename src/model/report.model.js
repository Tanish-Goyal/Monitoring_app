const db = require('../database/mongo');

const FolderReportSchema = new db.Schema({
  path: String,
  name: String,
  description: String,
  size: Number,
  fileCount: Number,
  folderCount: Number,
  logFileCount: Number,
  logFilePaths: [String],
  error: String
});

const FileReportSchema = new db.Schema({
  path: String,
  name: String,
  description: String,
  size: Number,
  error: String
});

const CommandReportSchema = new db.Schema({
  script: String,
  name: String,
  description: String,
  output: String,
  error: String
});

const ReportSchema = new db.Schema({
  appId: String,
  specId: String,
  generatedAt: String,
  bundleName: String,
  hostName: String,
  folderReports: [FolderReportSchema],
  fileReports: [FileReportSchema],
  commandReports: [CommandReportSchema]
});
const ReportModel = db.model('Report', ReportSchema);

module.exports = ReportModel;
