const mongoose = require('mongoose');
const logger = require('../logs/logger');
require('path');
require('dotenv').config({ path: '.env' });

mongoose.Promise = global.Promise;

const mong = async () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    await mongoose.connect(process.env.DBURI, connectionParams);
    logger.info('MongoDB Connection Successful');
  } catch (err) {
    logger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
    process.exit(1);
  }
};

module.exports = mong;
