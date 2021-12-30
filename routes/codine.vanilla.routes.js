const express = require('express');
const { codineVanillaController } = require('../controllers/codine.vanilla.controllers');

const codineVanillaRouter = express.Router();

// Routes here

// Vanilla Routes

// @route POST /vanilla/create/1
// @desc Implements Pusher Live Sync Functionality
// @access Public
codineVanillaRouter.post('/create/1', codineVanillaController);

module.exports = codineVanillaRouter;
