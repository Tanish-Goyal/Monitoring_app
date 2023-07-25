const db = require('../database/mongo');

const app = db.model('app',
    {  
        cronString: String,
        readableCron: String,
        description: String,
        projectId: String,
        appName: String,
        createdAt: String,
    }
);

module.exports = app;