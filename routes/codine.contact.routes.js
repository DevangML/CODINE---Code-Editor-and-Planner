const express = require('express');

const { codineContactCreateController } = require('../controllers/codine.contact.controllers');

const codineContactRouter = express.Router();

// Routes here

// Contact Routes

// @route POST /contact/create
// @desc Posts contact form to DB
// @access  Public
codineContactRouter.post('/create', codineContactCreateController);

module.exports = codineContactCreateController;
