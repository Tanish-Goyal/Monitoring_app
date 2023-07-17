const db = require('../database/mongo');

const project = db.model('project',
    {  
        userId: String,
        projectName: String,
        createdAt: String
    }
);

module.exports = project;