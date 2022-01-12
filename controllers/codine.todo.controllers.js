require('path');
const dotenv = require('dotenv');

dotenv.config();
require('../databases/codine.dbs');
const logger = require('../logs/logger');
const CodineToDoModel = require('../models/codine.todo.models');
const Joi = require('joi');

// ToDo List Controllers

const codineToDoCreateController = async (req, res) => {
  const authType = req.header('authType');
  logger.info(`${authType}`);

  let userId;

  if (authType === 'Google') {
    userId = req.user.sub;
  } else if (authType === 'jwtAuth') {
    userId = req.user.id;
  }

  logger.info(`${userId}`);

  const schema = Joi.object({
    name: Joi.string().min(3).max(200).required(),
    author: Joi.string().min(3),
    uid: Joi.string(),
    isComplete: Joi.boolean(),
    date: Joi.date(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const { name, author, isComplete, date } = req.body;

  const uid = userId;

  let todo = new CodineToDoModel({ name, author, isComplete, date, uid });

  todo = await todo.save();
  res.send(todo);
};

const codineToDoReadController = async (req, res, next) => {
  try {
    const authType = req.header('authType');

    let userId;

    if (authType === 'Google') {
      userId = req.user.sub;
    } else if (authType === 'jwtAuth') {
      userId = req.user.id;
    }

    const todos = await CodineToDoModel.find().sort({ date: -1 });
    const filteredTodos = todos.filter((todo) => todo.uid === userId);
    res.send(filteredTodos);
  } catch (error) {
    logger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
    await res.status(500).send('Error: ' + error.message);
  }
};

const codineToDoUpdateController = async (req, res) => {
  const authType = req.header('authType');
  let userId;

  if (authType === 'Google') {
    userId = req.user.sub;
  } else if (authType === 'jwtAuth') {
    userId = req.user.id;
  }

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    author: Joi.string().min(3),
    uid: Joi.string(),
    isComplete: Joi.boolean(),
    date: Joi.date(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(result.error.details[0].message);

  const todo = await CodineToDoModel.findById(req.params.id);

  if (!todo) return res.status(404).send('Todo not found...');

  if (todo.uid !== userId) return res.status(401).send('Todo update failed. Not authorized...');

  const { name, author, isComplete, date, uid } = req.body;

  const updatedTodo = await CodineToDoModel.findByIdAndUpdate(
    req.params.id,
    { name, author, isComplete, date, uid },
    { new: true }
  );

  res.send(updatedTodo);
};

const codineToDoPartialUpdateController = async (req, res) => {
  const authType = req.header('authType');
  let userId;

  if (authType === 'Google') {
    userId = req.user.sub;
  } else if (authType === 'jwtAuth') {
    userId = req.user.id;
  }

  const todo = await CodineToDoModel.findById(req.params.id);

  if (!todo) return res.status(404).send('Todo not found...');

  if (todo.uid !== userId)
    return res.status(401).send('Todo check/uncheck failed. Not authorized...');

  const updatedTodo = await CodineToDoModel.findByIdAndUpdate(
    req.params.id,
    {
      isComplete: !todo.isComplete,
    },
    {
      new: true,
    }
  );

  res.send(updatedTodo);
};

const codineToDoDeleteController = async (req, res) => {
  const authType = req.header('authType');
  let userId;

  if (authType === 'Google') {
    userId = req.user.sub;
  } else if (authType === 'jwtAuth') {
    userId = req.user.id;
  }

  const todo = await CodineToDoModel.findById(req.params.id);

  if (!todo) return res.status(404).send('Todo not found...');

  if (todo.uid !== userId) return res.status(401).send('Todo deletion failed. Not authorized...');

  const deletedTodo = await CodineToDoModel.findByIdAndDelete(req.params.id);

  res.send(deletedTodo);
};

module.exports = {
  codineToDoCreateController,
  codineToDoReadController,
  codineToDoUpdateController,
  codineToDoPartialUpdateController,
  codineToDoDeleteController,
};
