const express = require('express');
const {
  oceContactPostController,
  oceVanillaController,
  oceLiveCompilerPostController,
} = require('../controllers/oce.controllers');
const oceContactRouter = express.Router();
const oceVanillaRouter = express.Router();
const oceLiveCompilerRouter = express.Router();

// Routes here

// Contact Routes
oceContactRouter.post('/post', oceContactPostController);

// Vanilla Routes
oceVanillaRouter.post('/', oceVanillaController);

// LiveCompiler Routes
oceLiveCompilerRouter.post('/runCode', oceLiveCompilerPostController);

module.exports = {
  oceContactRouter,
  oceVanillaRouter,
  oceLiveCompilerRouter,
};
