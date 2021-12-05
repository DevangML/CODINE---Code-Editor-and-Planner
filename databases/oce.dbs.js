const mongoose = require('mongoose');
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
  } catch (err) {
    process.exit(1);
  }
};

module.exports = mong;
