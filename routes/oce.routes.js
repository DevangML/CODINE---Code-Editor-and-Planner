const express = require('express');
const {
  oceContactPostController,
  oceVanillaController,
} = require('../controllers/oce.controllers');
const oceContactRouter = express.Router();
const oceVanillaRouter = express.Router();

// Routes here

// Contact Routes
oceContactRouter.post('/post', oceContactPostController);

// Vanilla Routes
oceVanillaRouter.post('/', oceVanillaController);

module.exports = {
  oceContactRouter,
  oceVanillaRouter,
};
