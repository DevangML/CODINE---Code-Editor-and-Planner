const express = require('express');
const {
  codineLiveCompilerCreateController,
} = require('../controllers/codine.compiler.controllers');

const codineLiveCompilerRouter = express.Router();

// Routes here

// @route POST /compiler/create
// @desc Implements Live Compiler Logic
// @access Public
codineLiveCompilerRouter.post('/create', codineLiveCompilerCreateController);

module.exports = codineLiveCompilerRouter;
