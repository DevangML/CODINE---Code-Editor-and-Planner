// Import Section
const express = require('express')
const { ocePostRouter, oceVanillaRouter } = require('./routes/oce.routes')
const cors = require('cors')
const path = require('path')
require('dotenv').config({ path: '.env' })
const compression = require('compression')
const passport = require('./config/passport')

// App Initialization
const expressApp = express()

// Compression

expressApp.use(compression())

// CORS Setup
var corsOptions = {
  origin: 'http://localhost:3000'
}
expressApp.use(cors(corsOptions))

// Basic express config
expressApp.use(express.json())
expressApp.use(express.urlencoded({ extended: true }))

// Post Route
expressApp.use('/contact', ocePostRouter)

// Static view configuration

expressApp.use(express.static(path.resolve(__dirname, './view/build')))

// Catch all requests that don't match any route
expressApp.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './view/build/index.html'))
})

// Pusher Code

expressApp.use('/vanilla', oceVanillaRouter)

// Authentication Code

expressApp.use(passport.initialize())

// Passport config

require('./config/passport')(passport)

module.exports = expressApp
