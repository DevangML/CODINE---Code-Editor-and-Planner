const http = require('http');
const expressApp = require('./oce.app');
const mong = require('./databases/oce.dbs');
require('path');
require('dotenv').config({ path: '.env' });

// Server Initialization
const httpServer = http.createServer(expressApp);

// Making database connection

mong();

// Making Port and connection for express.js
const port = process.env.PORT || '5000';
httpServer.listen(port, (err) => {
  if (err) throw err;
});
