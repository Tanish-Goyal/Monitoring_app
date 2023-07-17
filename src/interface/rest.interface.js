// start the server
// register the routes
const config = require('../utils/config');
const express = require('express');
const logger = require('../utils/logger');
const authController = require('../controller/auth.controller');
const app = express();
const port = config.SERVER_PORT;
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use((req, res, next) => {
  // Log an info message for each incoming request
  logger.info(`Received a ${req.method} request for ${req.url}`);
  next();
});
// Handle errors using the logger
app.use((err, req, res, next) => {
  // Log the error message at the error level
  logger.error(err.message);
  res.status(500).send();
  next();
});

app.use('/auth', authController);

const startRestServer = ()=>{
  app.listen(port, () => {
    logger.info(`app listening on port ${port}`);
  });
};
module.exports = startRestServer;
