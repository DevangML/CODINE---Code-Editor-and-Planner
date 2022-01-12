require('path');
const dotenv = require('dotenv');

dotenv.config();
require('../databases/codine.dbs');
const request = require('request');
const logger = require('../logs/logger');

const clientSecret = process.env.CLIENT_SECRET;
const clientId = process.env.CLIENT_ID;

// LiveCompiler Controllers

const codineLiveCompilerCreateController = async (req, res) => {
  try {
    if (req.body.language === 'python') req.body.language = 'python3';
    const program = {
      script: req.body.code,
      language: req.body.language,
      stdin: req.body.input,
      versionIndex: '0',
      clientId,
      clientSecret,
    };
    request(
      {
        url: 'https://api.jdoodle.com/v1/execute',
        method: 'POST',
        json: program,
      },
      (error, response, body) => res.status(201).send(body)
    );
    logger.info('Live Compiler is working as expected');
  } catch (err) {
    await res.status(500).json({ error: err, errorInfo: 'Unexpected Error' });
    logger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
  }
};

module.exports = { codineLiveCompilerCreateController };
