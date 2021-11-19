const { oceContactModel, oceToDoModel } = require('../models/oce.models');
require('path');
const dotenv = require('dotenv');
dotenv.config();
require('../databases/oce.dbs');
const request = require('request');
const clientSecret = process.env.CLIENT_SECRET;
const clientId = process.env.CLIENT_ID;
// Contact Controllers

const oceContactPostController = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.phone ||
    !req.body.message
  ) {
    res.send({ message: 'Content cannot be empty' });
    return;
  }

  const oceInstance = new oceContactModel({
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

const oceLiveCompilerPostController = async (req, res) => {
  if (req.body.language == 'python') req.body.language = 'python3';
  var program = {
    script: req.body.code,
    language: req.body.language,
    stdin: req.body.input,
    versionIndex: '0',
    clientSecret,
    clientId,
  };
  request(
    {
      url: 'https://api.jdoodle.com/v1/execute',
      method: 'POST',
      json: program,
    },
    function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      return res.status(201).send(body);
    }
  );
};

const oceToDoListGetController = async (req, res) => {
  try {
    const tasks = await oceToDoModel.find();
    res.send(tasks);
  } catch (error) {
    res.send(error);
  }
};

const oceToDoListPostController = async (req, res) => {
  try {
    const task = await new oceToDoModel(req.body).save();
    res.send(task);
  } catch (error) {
    res.send(error);
  }
};

const oceToDoListPutController = async (req, res) => {
  try {
    const task = await oceToDoModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.send(task);
  } catch (error) {
    res.send(error);
  }
};

const oceToDoListDeleteController = async (req, res) => {
  try {
    const task = await oceToDoModel.findByIdAndDelete(req.params.id);
    res.send(task);
  } catch (error) {
    res.send(error);
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
};
