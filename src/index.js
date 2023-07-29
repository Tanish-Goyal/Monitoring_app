// TODO: entrypoint of our application
const startRestServer = require('./interface/rest.interface');
const startSubscribers = require('./interface/events.interface');

startSubscribers();
startRestServer();