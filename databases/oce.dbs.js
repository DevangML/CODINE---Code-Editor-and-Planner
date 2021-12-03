const mongoose = require('mongoose');
require('path');
require('dotenv').config({ path: '.env' });

mongoose.Promise = global.Promise;

const mong = async () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  await mongoose.connect(process.env.DBURI, connectionParams);
};

module.exports = mong;
