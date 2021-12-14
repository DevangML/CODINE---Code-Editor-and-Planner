const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
require('path');
const dotenv = require('dotenv');

dotenv.config();
const Pusher = require('pusher');
const { validationResult } = require('express-validator');

const jwtSecret = process.env.ACCESS_TOKEN_SECRET;
require('../databases/codine.dbs');
const request = require('request');
const logger = require('../logs/logger');
const {
  CodineContactModel,
  CodineToDoModel,
  CodineAuthModel,
  CodineGoogleAuthModel,
} = require('../models/codine.models');

const clientSecret = process.env.CLIENT_SECRET;
const clientId = process.env.CLIENT_ID;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Contact Controllers

const CodineContactPostController = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.phone || !req.body.message) {
      logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      return await res.status(400).json({
        error: 'Insufficient inputs',
      });
    }

    const codineInstance = new CodineContactModel({
      Name: req.body.name,
      Email: req.body.email,
      Phone: req.body.phone,
      Message: req.body.message,
    });

    const confirmation = await codineInstance.save();
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

const codineVanillaController = async (req, res) => {
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

const codineLiveCompilerPostController = async (req, res) => {
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

const codineToDoListGetController = async (req, res) => {
  try {
    const tasks = await CodineToDoModel.find();
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

const codineToDoListPostController = async (req, res) => {
  try {
    const task = await new CodineToDoModel(req.body).save();
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

const codineToDoListPutController = async (req, res) => {
  try {
    const task = await CodineToDoModel.findOneAndUpdate({ _id: req.params.id }, req.body);
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

const codineToDoListDeleteController = async (req, res) => {
  try {
    const task = await CodineToDoModel.findByIdAndDelete(req.params.id);
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

const codineAuthRegisterController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return await res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // See if user exists
    let user = await CodineAuthModel.findOne({ email });

    // Added return
    if (user) {
      logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      return await res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }
    user = new CodineAuthModel({
      name,
      email,
      password,
    });

    // Encrypt Password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Return jsonwebtoken
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

const codineAuthLoadingController = async (req, res) => {
  try {
    const user = await CodineAuthModel.findById(req.user.id).select('-password');
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

const codineAuthLoginController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return await res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // See if user exists
    const user = await CodineAuthModel.findOne({ email });

    if (!user) {
      logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      return await res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      return await res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    // Return jsonwebtoken
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

// Google Authentication Controllers

// Google Authentication Controllers

const codineGoogleAuthSaveController = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      requiredAudience: client,
    });
    const payload = await ticket.getPayload();
    const { sub, email, name, picture } = payload;

    const userId = sub;

    const codineGoogleAuthInstance = new CodineGoogleAuthModel({
      userId,
      fullName: name,
      email,
      photoUrl: picture,
    });

    const confirmation = await codineGoogleAuthInstance.save();
    res.send(confirmation);
    logger.info('Google User data saved to DB');
  } catch (err) {
    await res.status(500).send('Server error');
    logger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
  }
};

module.exports = {
  codineContactPostController,
  codineVanillaController,
  codineLiveCompilerPostController,
  codineToDoListGetController,
  codineToDoListPostController,
  codineToDoListPutController,
  codineToDoListDeleteController,
  codineAuthRegisterController,
  codineAuthLoadingController,
  codineAuthLoginController,
  codineGoogleAuthSaveController,
};
