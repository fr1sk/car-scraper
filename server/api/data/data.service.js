const Data = require('./data.model');

const createNewDataObject = async carData => {
  const data = new Data(carData);
  await data.save();
};

const getAllData = async () => Data.find({}, { title: 1, bestWords: 1 });

module.exports = {
  getAllData,
  createNewDataObject
};
