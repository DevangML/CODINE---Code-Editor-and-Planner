const express = require('express');
const { check } = require('express-validator');
const auth = require('../middlewares/auth');
const {
  codineAuthCreateController1,
  codineAuthReadController,
  codineAuthCreateController2,
  codineAuthCreateController3,
  codineAuthCreateController4,
} = require('../controllers/codine.auth.controllers');

const codineAuthRouter = express.Router();

// Routes here

// Authentication Routes

// @route   POST /auth/create/1
// @desc    Register user
// @access  Public
codineAuthRouter.post(
  '/create/1',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter password with 6 or more characters').isLength({ min: 6 }),
  ],

  codineAuthCreateController1
);

// @route   GET /auth/read
// @desc    Get user by token/ Loading user
// @access  Private
codineAuthRouter.get('/read', auth, codineAuthReadController);

// @route   POST /auth/create/2
// @desc    Authentication user & get token/ Login user
// @access  Public
codineAuthRouter.post(
  '/create/2',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  codineAuthCreateController2
);

// Google Authentication Routes

// @route POST /auth/create/3
// @desc Google authentication - saves user information to googleauths collection
// @access Public
codineAuthRouter.post('/create/3', auth, codineAuthCreateController3);

// @route POST /auth/create/4
// @desc Google authentication - saves user information to users collection
// @access Public
codineAuthRouter.post('/create/4', auth, codineAuthCreateController4);

module.exports = codineAuthRouter;
