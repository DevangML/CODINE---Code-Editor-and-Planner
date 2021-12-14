const express = require('express');
const { check } = require('express-validator');
const auth = require('../middlewares/auth');
const {
  codineContactPostController,
  codineVanillaController,
  codineLiveCompilerPostController,
  codineToDoListGetController,
  codineToDoListPostController,
  codineToDoListPutController,
  codineToDoListDeleteController,
  codineAuthRegisterController,
  codineAuthLoadingController,
  codineAuthLoginController,
  codineGoogleAuthSaveController,
} = require('../controllers/codine.controllers');

const codineContactRouter = express.Router();
const codineVanillaRouter = express.Router();
const codineLiveCompilerRouter = express.Router();
const codineToDoListRouter = express.Router();
const codineAuthRouter = express.Router();
const codineGoogleAuthTestRouter = express.Router();

// Routes here

// Contact Routes

// @route POST /contact/post
// @desc Posts contact form to DB
// @access  Public
codineContactRouter.post('/post', codineContactPostController);

// Vanilla Routes

// @route POST /vanilla
// @desc Implements Pusher Live Sync Functionality
// @access Public
codineVanillaRouter.post('/', codineVanillaController);

// LiveCompiler Routes

// @route POST /compiler/runCode
// @desc Implements Live Compiler Logic
// @access Public
codineLiveCompilerRouter.post('/runCode', codineLiveCompilerPostController);

// To-Do List Routes

// @route POST /todo/post
// @desc Saves Tasks in DB
// @access Public
codineToDoListRouter.post('/post', codineToDoListPostController);

// @route POST /todo/get
// @desc Retrieves Tasks from DB
// @access Public
codineToDoListRouter.get('/get', codineToDoListGetController);

// @route POST /todo/put/:id
// @desc Updates Tasks in DB
// @access Public
codineToDoListRouter.put('/put/:id', codineToDoListPutController);

// @route POST /todo/delete/:id
// @desc Deletes Tasks from DB
// @access Public
codineToDoListRouter.delete('/delete/:id', codineToDoListDeleteController);

// Authentication Routes

// @route   POST /auth/post
// @desc    Register user
// @access  Public
codineAuthRouter.post(
  '/post/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter password with 6 or more characters').isLength({ min: 6 }),
  ],
  codineAuthRegisterController
);

// @route   GET /auth/get
// @desc    Get user by token/ Loading user
// @access  Private
codineAuthRouter.get('/get', auth, codineAuthLoadingController);

// @route   POST /auth/post/load
// @desc    Authentication user & get token/ Login user
// @access  Public
codineAuthRouter.post(
  '/post/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  codineAuthLoginController
);

// Google Authentication Routes

// @route POST /auth/auth/google
// @desc Google authentication - saves user information to mongoDB
// @access Public
codineAuthRouter.post('/google/save', codineGoogleAuthSaveController);

module.exports = {
  codineContactRouter,
  codineVanillaRouter,
  codineLiveCompilerRouter,
  codineToDoListRouter,
  codineAuthRouter,
};
