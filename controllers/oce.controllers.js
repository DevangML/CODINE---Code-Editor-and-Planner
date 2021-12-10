const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('path');
const dotenv = require('dotenv');
dotenv.config();
const Pusher = require('pusher');
const logger = require('../logs/logger');
const { validationResult } = require('express-validator');
var jwtSecret = process.env.ACCESS_TOKEN_SECRET;
require('../databases/oce.dbs');
const request = require('request');
const { OceContactModel, OceToDoModel, OceAuthModel } = require('../models/oce.models');
const clientSecret = process.env.CLIENT_SECRET;
const clientId = process.env.CLIENT_ID;

// Contact Controllers

const oceContactPostController = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.phone || !req.body.message) {
      await res.status(400).json({
        error: 'Insufficient inputs',
      });
      logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }

    const oceInstance = new OceContactModel({
      Name: req.body.name,
      Email: req.body.email,
      Phone: req.body.phone,
      Message: req.body.message,
    });

    const confirmation = await oceInstance.save();
    await res.send(confirmation);
    logger.info('Form Submission Successful');
  } catch (err) {
    await res.status(500).json({ error: err, errorInfo: 'Unexpected Error' });
    logger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
  }
};

// Vanilla Controllers

const oceVanillaController = async (req, res) => {
  try {
    const pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.PUSHER_APP_KEY,
      secret: process.env.PUSHER_APP_SECRET,
      cluster: process.env.PUSHER_APP_CLUSTER,
      useTLS: true,
    });

    pusher.trigger('editor', 'code-update', {
      ...req.body,
    });

    await res.status(200).send('OK');
    logger.info('Pusher is working with vanilla web compiler');
  } catch (err) {
    await res.status(500).json({ error: err, errorInfo: 'Unepected Error' });
    logger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
  }
};

// LiveCompiler Controllers

const oceLiveCompilerPostController = async (req, res) => {
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

// ToDo List Controllers

const oceToDoListGetController = async (req, res) => {
  try {
    const tasks = await OceToDoModel.find();
    await res.send(tasks);
    logger.info('Sending tasks to frontend for get route of to do list');
  } catch (error) {
    await res.status(500).json({ error: err, errorInfo: 'Unexpected Error' });
    logger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
  }
};

const oceToDoListPostController = async (req, res) => {
  try {
    const task = await new OceToDoModel(req.body).save();
    await res.send(task);
    logger.info('Sending tasks to frontend for post route of to do list');
  } catch (error) {
    await res.status(500).json({ error: err, errorInfo: 'Unexpected Error' });
    logger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
  }
};

const oceToDoListPutController = async (req, res) => {
  try {
    const task = await OceToDoModel.findOneAndUpdate({ _id: req.params.id }, req.body);
    await res.send(task);
    logger.info('Sending tasks to frontend for put route of to do list');
  } catch (error) {
    await res.status(500).json({ error: err, errorInfo: 'Unexpected Error' });
    logger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
  }
};

const oceToDoListDeleteController = async (req, res) => {
  try {
    const task = await OceToDoModel.findByIdAndDelete(req.params.id);
    await res.send(task);
    logger.info('Sending tasks to frontend for delete route of to do list');
  } catch (error) {
    await res.status(500).json({ error: err, errorInfo: 'Unexpected Error' });
    logger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
  }
  return null;
};

// Authentication Controllers

const oceAuthRegisterController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return await res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // See if user exists
    let user = await OceAuthModel.findOne({ email });

    // Added return
    if (user) {
      logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      return await res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }
    user = new OceAuthModel({
      name,
      email,
      password,
    });

    //Encrypt Password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    //Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
      logger.error('JWT sent to frontend - register route');
    });
  } catch (err) {
    await res.status(500).json({ error: err, errorInfo: 'Unexpected Error' });
    logger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
  }
};

const oceAuthLoadingController = async (req, res) => {
  try {
    const user = await OceAuthModel.findById(req.user.id).select('-password');
    await res.json(user);
    logger.info('User sent to frontend for loading');
  } catch (err) {
    await res.status(500).json({ error: err, errorInfo: 'Unexpected Error' });
    logger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
  }
};

const oceAuthLoginController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return await res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // See if user exists
    let user = await OceAuthModel.findOne({ email });

    if (!user) {
      logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      return await res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      return await res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    //Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: '5 days' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
      logger.info('JWT sent to frontend - login route');
    });
  } catch (err) {
    await res.status(500).json({ error: err, errorInfo: 'Unexpected Error' });
    logger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
  }
};

module.exports = {
  oceContactPostController,
  oceVanillaController,
  oceLiveCompilerPostController,
  oceToDoListGetController,
  oceToDoListPostController,
  oceToDoListPutController,
  oceToDoListDeleteController,
  oceAuthRegisterController,
  oceAuthLoadingController,
  oceAuthLoginController,
};
