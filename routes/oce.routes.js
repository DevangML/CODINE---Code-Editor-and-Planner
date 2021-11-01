const express = require('express')
const {
  ocePostFormData,
  oceVanillaController
} = require('../controllers/oce.controllers')
const ocePostRouter = express.Router()
const oceVanillaRouter = express.Router()
const oceRegisterRouter = express.Router()
const oceRegisterRouter = express.Router()

// Routes here
ocePostRouter.post('/', ocePostFormData)
oceVanillaRouter.post('/', oceVanillaController)

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
oceRegisterRouter.post('/login', oceRegisterController)

module.exports = {
  ocePostRouter,
  oceVanillaRouter,
  oceRegisterRouter
}
