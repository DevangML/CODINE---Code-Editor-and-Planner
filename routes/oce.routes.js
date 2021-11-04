const express = require('express')
const {
  ocePostFormData,
  oceVanillaController,
  oceAuthRegisterController,
  oceAuthLoginController,
  oceProfilePostController,
  oceProfilePutController,
  oceProfileGetController1,
  oceProfileGetController2,
  oceProfileGetController5,
  oceUserPostController2,
  oceUserPostController1
} = require('../controllers/oce.controllers')
const ocePostRouter = express.Router()
const oceVanillaRouter = express.Router()
const oceAuthRouter = express.Router()
const oceProfileRouter = express.Router()
const oceUserRouter = express.Router()
const storage = require('../controllers/middlewares/oce.middlewares')

// Routes here

// Contact Routes
oceContactPostRouter.post('/', oceContactPostController)

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
  ocePostRouter,
  oceVanillaRouter,
  oceAuthRouter,
  oceProfileRouter,
  oceUserRouter
}
