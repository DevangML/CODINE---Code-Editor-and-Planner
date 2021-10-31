const contactSender = require('../models/oce.models')
require('path')
require('../databases/oce.dbs')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { userAuthModel } = require('../models/oce.models')

const ocePostFormData = async (req, res) => {
  // if(!req.body){
  //   res.send({message:"Content cannot be empty"})
  //   return
  // }

  const oceInstance = new contactSender({
    Name: req.body.name,
    Email: req.body.email,
    Phone: req.body.phone,
    Message: req.body.message
  })

  try {
    const confirmation = await oceInstance.save()
    res.send(confirmation)
    console.log('Form Sent')
  } catch {
    res.send({ message: err })
  }
}

const oceVanillaController = async (req, res) => {
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    useTLS: true
  })

  pusher.trigger('editor', 'code-update', {
    ...req.body
  })

  res.status(200).send('OK')
}

const oceAuthRegisterController = async (req, res) => {
  const user = req.body

  // Check if username or email has been taken by another user already
  const takenUsername = await userAuthModel.findOne({ username: user.username })
  const takenEmail = await userAuthModel.findOne({ email: user.email })

  if (takenUsername || takenEmail) {
    res.json({ message: 'Username and Email has already been taken' })
  } else {
    user.password = await bcrypt.hash(req.body.password, 10)
    const dbUser = new userAuthModel({
      username: user.username.toLowerCase(),
      email: user.email.toLowerCase(),
      password: user.password
    })
    dbUser.save()
    res.json({ message: 'Success' })
  }
}

const oceAuthLoginController = async (req, res) => {
  const userLoggingIn = req.body

  userAuthModel.findOne({ username: userLoggingIn.username }).then((dbUser) => {
    if (!dbUser) {
      return res.json({
        message: 'Invalid username or password'
      })
    }
    bcrypt
      .compare(userLoggingIn.password, dbUser.password)
      .then((isCorrect) => {
        if (isCorrect) {
          const payload = {
            id: dbUser._id,
            username: dbUser.username
          }
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 86400 },
            (err, token) => {
              if (err) return res.json({ message: err })
              return res.json({
                message: 'Success',
                token: 'Bearer' + token
              })
            }
          )
        } else {
          return res.json({
            message: 'Invalid username or password'
          })
        }
      })
  })
}

const oceCurrentUserController = async (req, res, next) => {
  res.json({ isLoggenIn: true, username: req.user.username })
}

module.exports = {
  ocePostFormData,
  oceVanillaController,
  oceAuthRegisterController,
  oceAuthLoginController,
  oceCurrentUserController
}
