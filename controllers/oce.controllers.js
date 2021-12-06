const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('path');
const dotenv = require('dotenv');
const Pusher = require('pusher');
const { validationResult } = require('express-validator');
var jwtSecret = 'mysecrettoken';
dotenv.config();
require('../databases/oce.dbs');
const request = require('request');
const { OceContactModel, OceToDoModel, OceAuthModel } = require('../models/oce.models');
const clientSecret = process.env.CLIENT_SECRET;
const clientId = process.env.CLIENT_ID;

// Contact Controllers

const oceContactPostController = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.phone || !req.body.message) {
    res.status(400).json({
      error: 'Insufficient inputs',
    });
  }

  const oceInstance = new OceContactModel({
    Name: req.body.name,
    Email: req.body.email,
    Phone: req.body.phone,
    Message: req.body.message,
  });

  try {
    const confirmation = await oceInstance.save();
    res.send(confirmation);
  } catch (err) {
    await res.status(500);
  }
};

// Vanilla Controllers

const oceVanillaController = async (req, res) => {
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

  res.status(200).send('OK');
};

// LiveCompiler Controllers

const oceLiveCompilerPostController = async (req, res) => {
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
};

// ToDo List Controllers

const oceToDoListGetController = async (req, res) => {
  try {
    const tasks = await OceToDoModel.find();
    res.send(tasks);
  } catch (error) {
    res.send(error);
  }
};

const oceToDoListPostController = async (req, res) => {
  try {
    const task = await new OceToDoModel(req.body).save();
    res.send(task);
  } catch (error) {
    res.send(error);
  }
};

const oceToDoListPutController = async (req, res) => {
  try {
    const task = await OceToDoModel.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.send(task);
  } catch (error) {
    res.send(error);
  }
};

const oceToDoListDeleteController = async (req, res) => {
  try {
    const task = await OceToDoModel.findByIdAndDelete(req.params.id);
    res.send(task);
  } catch (error) {
    res.send(error);
  }
  return null;
};

// Authentication Controllers

const oceAuthRegisterController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // See if user exists
    let user = await OceAuthModel.findOne({ email });

    if (user) {
      res.status(400).json({ errors: [{ msg: 'User already exists' }] });
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
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const oceAuthLoadingController = async (req, res) => {
  try {
    const user = await OceAuthModel.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const oceAuthLoginController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // See if user exists
    let user = await OceAuthModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
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
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
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
