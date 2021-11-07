const express = require('express')
const {
  oceContactPostController,
  oceVanillaController,
} = require('../controllers/oce.controllers')
const oceContactRouter = express.Router()
const oceVanillaRouter = express.Router()
const oceAuthRouter = express.Router()
const oceProfileRouter = express.Router()
const oceUserRouter = express.Router()
const storage = require('../controllers/middlewares/oce.middlewares')
const checkAuth = require('../controllers/middlewares/check-auth')
const multer = require('multer')

// Routes here

// Contact Routes
oceContactRouter.post('/', oceContactPostController)

// Vanilla Routes
oceVanillaRouter.post('/', oceVanillaController)

module.exports = {
  oceContactRouter,
  oceVanillaRouter
}
