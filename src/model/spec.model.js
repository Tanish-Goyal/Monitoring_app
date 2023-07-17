const db = require('../database/mongo');

const folderSchema = new db.Schema({
  path: String,
  name: String,
  description: String,
});

const fileSchema = new db.Schema({
  path: String,
  name: String,
  description: String,
  enableWatcher: Boolean,
});

const commandSchema = new db.Schema({
  script: String,
  name: String,
  description: String,
});

const specSchema = new db.Schema({
  id: String,
  name: String,
  version: String,
  description: String,
  cronString: String,
  folders: [folderSchema],
  files: [fileSchema],
  commands: [commandSchema],
});

const Spec = db.model('Spec', specSchema);

module.exports = Spec;
