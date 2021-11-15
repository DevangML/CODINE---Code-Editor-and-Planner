const mongoose = require('mongoose');
require('path');
require('dotenv').config({ path: '.env' });
mongoose.Promise = global.Promise;

let mong = () => {
  mongoose.connect(process.env.DBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = mong;
