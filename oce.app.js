// Import Section
const express = require('express');
const cors = require('cors');
const path = require('path');
const mong = require('./databases/oce.dbs');
const logger = require('./logs/logger');
require('dotenv').config({ path: '.env' });
const compression = require('compression');
const {
  oceContactRouter,
  oceVanillaRouter,
  oceLiveCompilerRouter,
  oceToDoListRouter,
  oceAuthRouter,
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
expressApp.use(express.json({ limit: '30mb', extended: true }));
expressApp.use(express.urlencoded({ limit: '30mb', extended: true }));

// Making database connection

mong();

// Redis Configuration

// const client = redis.createClient(6379)

// client.on('error', (error) => {
// console.error(error)
// })

// Static view configuration

expressApp.use(express.static('view/build'));
expressApp.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'view', 'build', 'index.html'));
  logger.info('Static files i.e. client served');
});

// Contact Route Initializers
expressApp.use('/contact', oceContactRouter);

// Vanilla Routes Initializers

expressApp.use('/vanilla', oceVanillaRouter);

// LiveCompiler Routes Initializers

expressApp.use('/compiler', oceLiveCompilerRouter);

// To-Do List Routes Initializers

expressApp.use('/todo', oceToDoListRouter);

// Authentication Routes Initializers

expressApp.use('/auth', oceAuthRouter);

// Making Port and connection for express.js
const port = process.env.PORT || '5000';
const host = 'localhost';

expressApp.listen(port, () => {
  logger.info(`Server started and running on http://${host}:${port}`);
});
