const express = require('express');
const {
  codineToDoListReadController,
  codineToDoListCreateController,
  codineToDoListUpdateController,
  codineToDoListDeleteController,
} = require('../controllers/codine.todo.controllers');

const codineToDoListRouter = express.Router();

// Routes here

// @route POST /todo/create
// @desc Saves Tasks in DB
// @access Public
codineToDoListRouter.post('/create', codineToDoListCreateController);

// @route POST /todo/read
// @desc Retrieves Tasks from DB
// @access Public
codineToDoListRouter.get('/read', codineToDoListReadController);

// @route POST /todo/update/:id
// @desc Updates Tasks in DB
// @access Public
codineToDoListRouter.put('/update/:id', codineToDoListUpdateController);

// @route POST /todo/delete/:id
// @desc Deletes Tasks from DB
// @access Public
codineToDoListRouter.delete('/delete/:id', codineToDoListDeleteController);

module.exports = codineToDoListRouter;
