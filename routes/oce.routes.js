const express = require('express');
const {
  oceContactPostController,
  oceVanillaController,
  oceLiveCompilerPostController,
  oceToDoListGetController,
  oceToDoListPostController,
  oceToDoListPutController,
  oceToDoListDeleteController,
  oceAuthSignInController,
  oceAuthSignUpController,
} = require('../controllers/oce.controllers');

const oceContactRouter = express.Router();
const oceVanillaRouter = express.Router();
const oceLiveCompilerRouter = express.Router();
const oceToDoListRouter = express.Router();
const oceAuthRouter = express.Router;

// Routes here

// Contact Routes
oceContactRouter.post('/post', oceContactPostController);

// Vanilla Routes
oceVanillaRouter.post('/', oceVanillaController);

// LiveCompiler Routes
oceLiveCompilerRouter.post('/runCode', oceLiveCompilerPostController);

// To-Do List Routes

oceToDoListRouter.post('/', oceToDoListPostController);
oceToDoListRouter.get('/', oceToDoListGetController);
oceToDoListRouter.put('/:id', oceToDoListPutController);
oceToDoListRouter.delete('/:id', oceToDoListDeleteController);

// Authentication Routes

oceAuthRouter.post('/signin', oceAuthSignInController);
oceAuthRouter.post('/signup', oceAuthSignUpController);

module.exports = {
  oceContactRouter,
  oceVanillaRouter,
  oceLiveCompilerRouter,
  oceToDoListRouter,
  oceAuthRouter,
};
