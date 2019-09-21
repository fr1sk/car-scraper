const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
  title: { type: String },
  url: { type: String },
  article: { type: String },
  wordCounter: { type: Number },
  bestWords: [
    {
      count: { type: Number },
      word: { type: String }
    }
  ]
});

module.exports = mongoose.model('Data', dataSchema);
