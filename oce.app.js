// Import Section
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: '.env' });
const compression = require('compression');
const {
  oceContactRouter,
  oceVanillaRouter,
  oceLiveCompilerRouter,
  oceToDoListRouter,
} = require('./routes/oce.routes');
// const redis = require('redis')

// App Initialization
const expressApp = express();

// Compression

expressApp.use(compression());

// CORS Setup
const corsOptions = {
  origin: 'http://localhost:3000',
};
expressApp.use(cors(corsOptions));

// Basic express config
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: true }));

// Redis Configuration

// const client = redis.createClient(6379)

// client.on('error', (error) => {
// console.error(error)
// })

// Contact Route Initializers
expressApp.use('/contact', oceContactRouter);

// Static view configuration

expressApp.use(express.static(path.resolve(__dirname, './view/build')));

// Catch all requests that don't match any route
expressApp.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './view/build/index.html'));
});

// Vanilla Routes Initializers

expressApp.use('/vanilla', oceVanillaRouter);

// LiveCompiler Routes Initializers

expressApp.use('/compiler', oceLiveCompilerRouter);

// To-Do List Routes Initializers

expressApp.use('/todo', oceToDoListRouter);

module.exports = expressApp;
