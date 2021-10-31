const express = require('express')
const {
  ocePostFormData,
  oceVanillaController,
  oceAuthRegisterController,
  oceAuthLoginController,
  oceCurrentUserController
} = require('../controllers/oce.controllers')
const ocePostRouter = express.Router()
const oceVanillaRouter = express.Router()
const oceAuthRegisterRouter = express.Router()
const oceAuthLoginRouter = express.Router()
const oceCurrentUserRouter = express.Router()

// Auth middleware

function verifyJWT(req, res, next) {
  const token = req.headers['x-access-token']?.split(' ')[1]

  if (token) {
    jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
      if (err)
        return res.json({
          isLoggedIn: false,
          message: 'Failed to authenticate'
        })
      req.user = {}
      req.user.id = decoded.id
      req.user.username = decoded.username
      next()
    })
  } else {
    res.json({ message: 'Incorrect Token Given', isLoggenIn: false })
  }
}

// Routes here
ocePostRouter.post('/', ocePostFormData)
oceVanillaRouter.post('/', oceVanillaController)
oceAuthRegisterRouter.post('/', oceAuthRegisterController)
oceAuthLoginRouter.post('/', oceAuthLoginController)
oceCurrentUserRouter.get('/', verifyJWT, oceCurrentUserController)

module.exports = {
  ocePostRouter,
  oceVanillaRouter,
  oceAuthRegisterRouter,
  oceAuthLoginRouter,
  oceCurrentUserRouter
}
