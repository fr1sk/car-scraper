const log = require('../../services/logger');
const { crawl } = require('../../services/scraper');
const dataService = require('../data/data.service');

exports.getData = async (req, res) => {
  // throw Error('🕷️ Error getting data');
  log.info('🕷️ Getting data');
  const result = await dataService.getAllData();
  res.json(result);
};


exports.startScraping = async (req, res) => {
  log.info('🕷️ Scraping...');
  res.status(200).send('🕷️ Started scraping...');
  crawl();
};
