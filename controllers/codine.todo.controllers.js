require('path');
const dotenv = require('dotenv');
dotenv.config();
require('../databases/codine.dbs');
const logger = require('../logs/logger');
const { CodineToDoModel } = require('../models/codine.todo.models');

// ToDo List Controllers

const codineToDoListCreateController = async (req, res) => {
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

const codineToDoListReadController = async (req, res) => {
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

const codineToDoListUpdateController = async (req, res) => {
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

module.exports = {
  codineToDoListCreateController,
  codineToDoListReadController,
  codineToDoListUpdateController,
  codineToDoListDeleteController,
};
