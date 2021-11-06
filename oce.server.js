const http = require('http')
const expressApp = require('./oce.app')
const dotenv = require('dotenv')
const mong = require('./databases/oce.dbs')
dotenv.config()

// Server Initialization
const httpServer = http.createServer(expressApp)

// Making database connection

mong()

// Making Port and connection for express.js
var port = process.env.PORT || '5000'
httpServer.listen(port, (err) => {
  if (err) throw err
  console.log('Server listening on port', port)
})
