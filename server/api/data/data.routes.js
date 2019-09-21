const router = require('express').Router();

const { catchAsyncError } = require('../../services/utils');
const { getData, startScraping } = require('./data.controller');

router
  // .post('/', conversation);
  .get('/get', catchAsyncError(getData))
  .get('/crawl', catchAsyncError(startScraping));

module.exports = router;
