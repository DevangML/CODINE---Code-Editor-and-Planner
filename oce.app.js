// Import Section
const express = require('express');
const {
  oceContactRouter,
  oceVanillaRouter,
  oceLiveCompilerRouter,
} = require('./routes/oce.routes');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: '.env' });
const compression = require('compression');
// const redis = require('redis')

// App Initialization
const expressApp = express();

// Compression

expressApp.use(compression());

// CORS Setup
var corsOptions = {
  origin: 'http://localhost:3000',
};
expressApp.use(cors(corsOptions));

// Basic express config
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: true }));

// Redis Configuration

// const client = redis.createClient(6379)

// client.on('error', (error) => {
// 	console.error(error)
// })

// Contact Route Initializers
expressApp.use('/contact', oceContactRouter);

// Static view configuration

expressApp.use(express.static(path.resolve(__dirname, './view/build')));

// Catch all requests that don't match any route
expressApp.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './view/build/index.html'));
});

// Vanilla Route Initializers

expressApp.use('/vanilla', oceVanillaRouter);

// LiveCompiler Route Initializers

expressApp.use('/', oceLiveCompilerRouter);

module.exports = expressApp;
