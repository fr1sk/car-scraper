const axios = require('axios');
const cheerio = require('cheerio');
const { CronJob } = require('cron');

const log = require('./logger');
const { Headers: headers } = require('./constants');
const { getWordsCounter, getBestWords } = require('./helper');
const dataService = require('../api/data/data.service');


const crawlArticleAndCountWords = async url => {
  try {
    const { data: html, status } = await axios.get(url, { headers });
    if (status !== 200) throw Error(`Status is not OK, status is ${status}`);
    const $ = await cheerio.load(html);
    const allArticles = $('p');
    let wholeArticle = '';
    $(allArticles).each((i, article) => {
      wholeArticle += $(article).text().replace(/\s\s+/g, '');
    });
    const numOfWords = wholeArticle.match(/\w+/g).length;
    const bestWords = getBestWords(getWordsCounter(wholeArticle.trim().split(' '))).filter(w => w.word !== '').slice(0, 10);
    // log.info('🗯️', wholeArticle, numOfWords, bestWords);
    return {
      wholeArticle,
      numOfWords,
      bestWords
    };
  } catch (e) {
    log.error('Error in crawling article: ', e);
  }
};

const crawl = async () => {
  try {
    const { data: html, status } = await axios.get(process.env.SCRAPING_URL, { headers });
    if (status !== 200) throw Error(`Status is not OK, status is ${status}`);
    const $ = await cheerio.load(html);
    const allCars = $('table.wikitable > tbody > tr > th > i > a');
    // const allCars = [];
    $(allCars).each(async (i, car) => {
      const link = $(car).attr('href') ? `https://en.wikipedia.com${$(car).attr('href')}` : '';
      const text = $(car).text();
      const carData = {
        url: link,
        title: text
      };
      if (link) {
        const { wholeArticle, numOfWords, bestWords } = await crawlArticleAndCountWords(link);
        carData.article = wholeArticle;
        carData.wordCounter = numOfWords;
        carData.bestWords = bestWords;
      }
      await dataService.createNewDataObject(carData);
      log.info(`🎉 ${carData.title}, ${carData.url}, ${carData.wordCounter}`);
    });
  } catch (e) {
    log.error('Error in crawling: ', e);
  }
};

// crawlArticleAndCountWords('https://en.wikipedia.org/wiki/ZAZ');

const crawlerCron = () => new CronJob('30 * * * *', crawl, null, false, 'America/New_York');

module.exports = {
  crawl,
  crawlerCron
};
