/* eslint-disable no-undef */
const config = {
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017',
  DATABASE_USER: process.env.DATABASE_USER || 'admin',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'root',
  DATABASE_AUTH_SOURCE: process.env.DATABASE_AUTH_SOURCE || 'admin',
  SERVER_PORT: process.env.PORT || 4200,
  SECRET_KEY: process.env.SECRET_KEY || 'JAI__MATA__DI',
  REDIS_URL: process.env.REDIS_URL || 'redis://default:redispw@localhost:6379',
  UPLOAD_PATH: process.env.UPLOAD_PATH || 'c:/uploads',
  PROCESSED_PATH: process.env.PROCESSED_PATH || 'c:/unzipped',
  DAEMON_PATH: process.env.DAEMON_PATH || 'c:/daemonbuilds'
};

module.exports = config;
