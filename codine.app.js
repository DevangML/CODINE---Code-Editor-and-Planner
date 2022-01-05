// Import Section
const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const mong = require('./databases/codine.dbs');
const logger = require('./logs/logger');
require('dotenv').config({ path: '.env' });
const compression = require('compression');
const codineAuthRouter = require('./routes/codine.auth.routes');
const codineContactRouter = require('./routes/codine.contact.routes');
const codineLiveCompilerRouter = require('./routes/codine.contact.routes');
const codineToDoListRouter = require('./routes/codine.todo.routes');
const codineVanillaRouter = require('./routes/codine.vanilla.routes');
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
expressApp.use(helmet());

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
expressApp.use('/contact', codineContactRouter);

// Vanilla Routes Initializers

expressApp.use('/vanilla', codineVanillaRouter);

// LiveCompiler Routes Initializers

expressApp.use('/compiler', codineLiveCompilerRouter);

// To-Do List Routes Initializers

expressApp.use('/todo', codineToDoListRouter);

// Authentication Routes Initializers

expressApp.use('/auth', codineAuthRouter);

// Making Port and connection for express.js
const port = process.env.PORT || '5000';
const host = 'localhost';

expressApp.listen(port, () => {
  logger.info(`Server started and running on http://${host}:${port}`);
});
