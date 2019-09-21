const dataRoutes = require('./api/data');

module.exports = app => {
  app.use('/data', dataRoutes);
};
