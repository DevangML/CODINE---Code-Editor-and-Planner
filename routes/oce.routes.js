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
  oceGoogleAuthSaveController,
} = require('../controllers/oce.controllers');

const oceContactRouter = express.Router();
const oceVanillaRouter = express.Router();
const oceLiveCompilerRouter = express.Router();
const oceToDoListRouter = express.Router();
const oceAuthRouter = express.Router();
const oceGoogleAuthTestRouter = express.Router();

// Routes here

// Contact Routes

// @route POST /contact/post
// @desc Posts contact form to DB
// @access  Public
oceContactRouter.post('/post', oceContactPostController);

// Vanilla Routes

// @route POST /vanilla
// @desc Implements Pusher Live Sync Functionality
// @access Public
oceVanillaRouter.post('/', oceVanillaController);

// LiveCompiler Routes

// @route POST /compiler/runCode
// @desc Implements Live Compiler Logic
// @access Public
oceLiveCompilerRouter.post('/runCode', oceLiveCompilerPostController);

// To-Do List Routes

// @route POST /todo/post
// @desc Saves Tasks in DB
// @access Public
oceToDoListRouter.post('/post', oceToDoListPostController);

// @route POST /todo/get
// @desc Retrieves Tasks from DB
// @access Public
oceToDoListRouter.get('/get', oceToDoListGetController);

// @route POST /todo/put/:id
// @desc Updates Tasks in DB
// @access Public
oceToDoListRouter.put('/put/:id', oceToDoListPutController);

// @route POST /todo/delete/:id
// @desc Deletes Tasks from DB
// @access Public
oceToDoListRouter.delete('/delete/:id', oceToDoListDeleteController);

// Authentication Routes

// @route   POST /auth/post
// @desc    Register user
// @access  Public
oceAuthRouter.post(
  '/post/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter password with 6 or more characters').isLength({ min: 6 }),
  ],
  oceAuthRegisterController
);

// @route   GET /auth/get
// @desc    Get user by token/ Loading user
// @access  Private
oceAuthRouter.get('/get', auth, oceAuthLoadingController);

// @route   POST /auth/post/load
// @desc    Authentication user & get token/ Login user
// @access  Public
oceAuthRouter.post(
  '/post/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  oceAuthLoginController
);

// Google Authentication Routes

// @route POST /auth/auth/google
// @desc Google authentication - saves user information to mongoDB
// @access Public
oceAuthRouter.post('/google/save', oceGoogleAuthSaveController);

module.exports = {
  oceContactRouter,
  oceVanillaRouter,
  oceLiveCompilerRouter,
  oceToDoListRouter,
  oceAuthRouter,
};
