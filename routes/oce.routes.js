const express = require("express")
const {
  ocePostFormData,
  oceVanillaController
} = require("../controllers/oce.controllers")
const ocePostRouter = express.Router()
const oceVanillaRouter = express.Router()

// Routes here
ocePostRouter.post("/", ocePostFormData)
oceVanillaRouter.post("/", oceVanillaController)

module.exports = { ocePostRouter, oceVanillaRouter }
