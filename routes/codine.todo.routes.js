const express = require('express');
const {
  codineToDoCreateController,
  codineToDoReadController,
  codineToDoUpdateController,
  codineToDoPartialUpdateController,
  codineToDoDeleteController,
} = require('../controllers/codine.todo.controllers');
const codineToDoRouter = express.Router();
const auth = require('../middlewares/auth');

// @route   GET /api/todo/read
// @desc    todo read and display to frontend
// @access  Public
codineToDoRouter.get('/read', auth, codineToDoReadController);

// @route   POST /api/todo/create
// @desc    Save todo state to db
// @access  Public
codineToDoRouter.post('/create', auth, codineToDoCreateController);

// @route   PUT /api/todo/update/:id
// @desc    Update todos
// @access  Public
codineToDoRouter.put('/update/:id', auth, codineToDoUpdateController);

// @route   PATCH /api/todo/update/partial/:id
// @desc    Change checked state of todo list
// @access  Public
codineToDoRouter.patch('/update/partial/:id', auth, codineToDoPartialUpdateController);

// @route   DELETE /api/todo/delete/:id
// @desc    Delete todo data from db
// @access  Public
codineToDoRouter.delete('/delete/:id', auth, codineToDoDeleteController);

module.exports = codineToDoRouter;
