const { userAgents } = require('./constants');

const getRandomUserAgent = () => userAgents[Math.floor(Math.random() * userAgents.length)];

const getWordsCounter = wordsArr => (
  wordsArr.reduce((count, word) => {
    word = word.replace(/[^a-zA-Z ]/g, '');
    count[word] = (count[word] || 0) + 1;
    return count;
  }, {})
);

const getBestWords = wordsObj => {
  const sortable = [];
  for (let x in wordsObj) {
    sortable.push({word: x, count: wordsObj[x]});
  }
  return sortable.sort((a, b) => b.count - a.count);
};

module.exports = { getRandomUserAgent, getWordsCounter, getBestWords };
