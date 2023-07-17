const db = require('../database/mongo');

const app = db.model('project',
    {  
        projectId: String,
        appName: String,
        createdAt: String
    }
);

module.exports = app;