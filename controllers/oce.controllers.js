const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('path');
const dotenv = require('dotenv');
const Pusher = require('pusher');

dotenv.config();
require('../databases/oce.dbs');
const request = require('request');
const { OceContactModel, OceToDoModel, OceAuthModel } = require('../models/oce.models');

const clientSecret = process.env.CLIENT_SECRET;
const clientId = process.env.CLIENT_ID;
// Contact Controllers

const oceContactPostController = async (req, res) => {
  if (
    !req.body.name
    || !req.body.email
    || !req.body.phone
    || !req.body.message
  ) {
    res.send({ message: 'Content cannot be empty' });
    return;
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
    await res.send({ message: err });
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
  if (req.body.language == 'python') req.body.language = 'python3';
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
    (error, response, body) => res.status(201).send(body),
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
    const task = await OceToDoModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
    );
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
};

// Authentication Controllers

const oceAuthSignInController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) return res.status(404).json({ message: 'User doesn\'t exist' });

    const isPassCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPassCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    // eslint-disable-next-line no-underscore-dangle
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' });

    res.status(200).json({ result: existingUser, token });
  } catch {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const oceAuthSignUpController = async (req, res) => {
  const {
    email, password, confirmPassword, firstName, lastName,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
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
  oceAuthSignInController,
  oceAuthSignUpController,
};
