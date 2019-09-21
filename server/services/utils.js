const log = require('./logger');

const catchAsyncError = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(error => {
    log.error('❌  Async error catched - %s', error);
    res.sendStatus(500);
  });
};

module.exports = {
  catchAsyncError
};
