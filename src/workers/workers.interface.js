const workerpool = require('workerpool');
// eslint-disable-next-line no-undef
const pool = workerpool.pool(`${__dirname}/process.worker.js`);

module.exports = pool;