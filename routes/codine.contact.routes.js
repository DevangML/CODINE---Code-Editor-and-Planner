const express = require('express');

const { codineContactCreateController } = require('../controllers/codine.contact.controllers');
const auth = require('../middlewares/auth');
const codineContactRouter = express.Router();

// Routes here

// Contact Routes

// @route POST /contact/create
// @desc Posts contact form to DB
// @access  Public
codineContactRouter.post('/create', auth, codineContactCreateController);

module.exports = codineContactRouter;
