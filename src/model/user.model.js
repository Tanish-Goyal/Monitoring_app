const db = require('../database/mongo');

const user = db.model('user', {email: String,
    password: String,
    company: String    
});

module.exports = user;
