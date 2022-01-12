const express = require('express');
const { codineContactCreateController } = require('../controllers/codine.contact.controllers');
const codineContactRouter = express.Router();
const auth = require('../middlewares/auth');

// Routes here

// Contact Routes

// @route POST /contact/create
// @desc Posts contact form to DB
// @access  Public
codineContactRouter.post('/create', auth, codineContactCreateController);

module.exports = codineContactRouter;
