const mongoose = require('mongoose');
require('path');
require('dotenv').config({ path: '.env' });
mongoose.Promise = global.Promise;

let mong = () => {
  mongoose.connect(
    process.env.DBURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (!err) {
        console.log('MongoDB Connection Succeeded.');
      } else {
        console.log('Error in DB connection: ' + err);
      }
    }
  );
};

module.exports = mong;
