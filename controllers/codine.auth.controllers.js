const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('path');
const dotenv = require('dotenv');
dotenv.config();
const { validationResult } = require('express-validator');
const jwtSecret = process.env.ACCESS_TOKEN_SECRET;
require('../databases/codine.dbs');
const logger = require('../logs/logger');
const {
  CodineAuthModel,
  CodineGoogleAuthModel,
  CodineUserModel,
} = require('../models/codine.auth.models');

// Authentication Controllers

const codineAuthCreateController1 = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // See if user exists

    let auth = await CodineAuthModel.findOne({ email });

    if (auth) {
      logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      return await res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }
    auth = new CodineAuthModel({
      name,
      email,
      password,
    });

    // Encrypt Password
    const salt = await bcrypt.genSalt(10);

    auth.password = await bcrypt.hash(password, salt);

    // Return jsonwebtoken
    const payload = {
      id: auth.id,
    };

    const userId = payload.id;
    const fullName = name;
    const emailId = email;
    const phone = await FormModel.findById({ userId }).select('phone');

    const user = await db.collection('users').findOne({ userId });

    if (!user) {
      const userInstance = new CodineUserModel({
        userId: userId,
        fullName: fullName,
        email: emailId,
        phone,
      });

      const userCreateConfirmation = await userInstance.save();
      logger.info(`Form data saved to DB with message: ${userCreateConfirmation}`);

      jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
        auth.token = token;
        logger.info('JWT Signed and sent as response for login request');
      });

      await auth.save();

      logger.info('Registered user info saved in DB');
    } else {
      await res.status(400).send('User already exists');
      logger.info('User already exists');
    }
  } catch (err) {
    await res.status(500).json({ error: err, errorInfo: 'Unexpected Error' });
    logger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
  }
};

const codineAuthReadController = async (req, res) => {
  try {
    const auth = await CodineAuthModel.findById(req.id).select('-password');
    await res.json(auth);
    logger.info('User Loaded');
  } catch (err) {
    await res.status(500).json({ error: err, errorInfo: 'Unexpected Error' });
    logger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
  }
};

const codineAuthCreateController2 = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // See if user exists
    const auth = await CodineAuthModel.findOne({ email });

    if (!auth) {
      logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      return await res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const isMatch = await bcrypt.compare(password, auth.password);

    if (!isMatch) {
      logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      return await res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    // Return jsonwebtoken
    const payload = {
      id: auth.id,
    };

    jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, async (err, token) => {
      if (err) throw err;
      await res.json({ token });
      logger.info('JWT Signed and sent as response for login request');
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

const codineAuthCreateController3 = async (req, res) => {
  try {
    const userId = req.user.sub;
    const { name, email, picture } = req.user;

    const user = await db.collection('googleauths').findOne({ email });

    if (!user) {
      const googleAuthInstance = new CodineGoogleAuthModel({
        userId,
        fullName: name,
        email,
        photoUrl: picture,
      });

      const confirmation = await googleAuthInstance.save();
      await res.send(confirmation);
      logger.info('Google User data saved to DB');
    } else {
      await res.status(400).send('User already exists');
      logger.info('User already exists');
    }
  } catch (err) {
    await res.status(500).send('Server error');
    logger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
  }
};

const codineAuthCreateController4 = async (req, res) => {
  try {
    const userId = req.user.sub;
    const fullName = req.user.name;
    const emailId = req.user.email;
    const phone = await EventFormModel.findById({ userId }).select('phone');
    const user = await db.collection('users').findOne({ emailId });

    if (!user) {
      const googleUserInstance = new CodineUserModel({
        userId: userId,
        fullName: fullName,
        email: emailId,
        phone,
      });

      const googleUserCreateConfirmation = await googleUserInstance.save();
      logger.info('Form data saved to DB with message: ', googleUserCreateConfirmation);
    } else {
      await res.status(400).send('User already exists');
      logger.info('User already exists');
    }
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
  codineAuthCreateController1,
  codineAuthReadController,
  codineAuthCreateController2,
  codineAuthCreateController3,
  codineAuthCreateController4,
};
