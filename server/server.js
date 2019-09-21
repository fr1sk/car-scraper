// Configuration of express app
const express = require('express');
const bodyParser = require('body-parser');
const log = require('./services/logger');
const { crawlerCron } = require('./services/scraper');
require('dotenv').config(); // This will put .env to process variables

const app = express();

// Unhandled rejection error handler
process.on('unhandledRejection', (reason, promise) => {
  log.info('🚧🤞 Unhandled Promise rejection: \n', reason.stack || reason);
});

// Setting up the application port
app.set('port', process.env.PORT || 8081);

// support parsing of application/json type post data
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));

// Database configuration
require('./services/dbConfig');

// Routes configuration
require('./routes')(app);

const port = app.get('port');
app.listen(port, () => {
  log.info(`${require('../package.json').name} is 🏃‍  on ${port}`);
});

// TODO: Not testd, no enough time :/
// crawlerCron().start();

module.exports = app;
