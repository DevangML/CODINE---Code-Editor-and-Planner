const express = require('express')
const {
  oceContactPostController,
  oceVanillaController,
  oceAuthRegisterController,
  oceAuthLoginController,
  oceProfilePostController,
  oceProfilePutController,
  oceProfileGetController1,
  oceProfileGetController2,
  oceProfileGetController3,
  oceProfileGetController4,
  oceProfileGetController5,
  oceUserPostController1,
  oceUserPostController2
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

// Auth Routes
oceAuthRouter.post('/signup', oceAuthRegisterController)
oceAuthRouter.post('/login', oceAuthLoginController)

// Profile Routes
oceProfileRouter.post(
  '/create',
  checkAuth,
  multer({ storage: storage }).single('image'),
  oceProfilePostController
)

oceProfileRouter.put(
  '/edit/:id',
  checkAuth,
  multer({ storage: storage }).single('image'),
  oceProfilePutController
)

oceProfileRouter.get('/profiles', oceProfileGetController1)

oceProfileRouter.get('/viewprofile', checkAuth, oceProfileGetController2)

oceProfileRouter.get('/bycreator/:id', oceProfileGetController3)

oceProfileRouter.get('/:id/mypost', oceProfileGetController4)

oceProfileRouter.get('/:id', oceProfileGetController5)

// User Routes
oceUserRouter.post('/signup', oceUserPostController1)

oceUserRouter.post('/login', oceUserPostController2)

module.exports = {
  oceContactRouter,
  oceVanillaRouter,
  oceAuthRouter,
  oceProfileRouter,
  oceUserRouter
}
