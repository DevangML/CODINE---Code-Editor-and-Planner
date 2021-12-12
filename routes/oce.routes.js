const express = require('express');
const auth = require('../middlewares/auth');
const { check } = require('express-validator');
const {
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
  oceGoogleAuthTestController,
} = require('../controllers/oce.controllers');

const oceContactRouter = express.Router();
const oceVanillaRouter = express.Router();
const oceLiveCompilerRouter = express.Router();
const oceToDoListRouter = express.Router();
const oceAuthRouter = express.Router();
const oceGoogleAuthTestRouter = express.Router();

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

// @route   POST /users
// @desc    Register user
// @access  Public
oceAuthRouter.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter password with 6 or more characters').isLength({ min: 6 }),
  ],
  oceAuthRegisterController
);

// @route   GET /users/auth
// @desc    Get user by token/ Loading user
// @access  Private
oceAuthRouter.get('/auth', auth, oceAuthLoadingController);

// @route   POST /users/auth
// @desc    Authentication user & get token/ Login user
// @access  Public
oceAuthRouter.post(
  '/auth',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  oceAuthLoginController
);

// Google Authentication Routes

oceGoogleAuthTestRouter.post('/', oceGoogleAuthTestController);

module.exports = {
  oceContactRouter,
  oceVanillaRouter,
  oceLiveCompilerRouter,
  oceToDoListRouter,
  oceAuthRouter,
  oceGoogleAuthTestRouter,
};
