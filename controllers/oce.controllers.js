const contactSender = require('../models/oce.models')
require('path')
require('../databases/oce.dbs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Profile = require('../models/profile')
const Post = require('../models/post')

// Contact Controllers

const oceContactPostController = async (req, res) => {
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

// Vanilla Controllers

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

const oceAuthRegisterController = async (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new oceAuthModel({
      email: req.body.email,
      password: hash
    })

    oceAuthModel
      .findOne({ email: req.body.email })
      .then((user1) => {
        if (user1) {
          return res.status(401).json({
            message: 'User Already Exist'
          })
        }

        user.save().then((result) => {
          if (!result) {
            return res.status(500).json({
              message: 'Error Creating USer'
            })
          }
          res.status(201).json({
            message: 'User created!',
            result: result
          })
        })
      })
      .catch((err) => {
        res.status(500).json({
          error: err
        })
      })
  })
}

// Auth Controllers

const oceAuthLoginController = async (req, res, next) => {
  let fetchedUser

  oceAuthModel
    .findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth failed no such user'
        })
      }
      fetchedUser = user
      return bcrypt.compare(req.body.password, user.password)
    })
    .then((result) => {
      console.log(fetchedUser)
      if (!result) {
        return res.status(401).json({
          message: 'Auth failed inccorect password'
        })
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        'secret_this_should_be_longer',
        { expiresIn: '1h' }
      )
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      })
    })
    .catch((e) => {
      console.log(e)
    })
}

// Profile Controller

const oceProfilePostController = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  console.log(url)
  const profile = new Profile({
    username: req.body.username,
    bio: req.body.bio,
    imagePath: url + '/images/' + req.file.filename,
    creator: req.userData.userId
  })

  Profile.findOne({ creator: req.userData.userId })
    .then((user1) => {
      if (user1) {
        return res.status(401).json({
          message: 'Profile Already Exist'
        })
      }
      return profile.save()
    })
    .then((prof) => {
      if (!prof) {
        return res.status(500).json({
          message: 'Error Creating Profile'
        })
      }
      res.status(201).json({
        message: 'Profile created!',
        profile: prof
      })
    })
    .catch((e) => {
      console.log('error is', e)
    })
}

const oceProfilePutController = (req, res, next) => {
  let imagePath = req.body.imagePath
  const url = req.protocol + '://' + req.get('host')
  if (req.file) {
    const url = req.protocol + '://' + req.get('host')
    imagePath = url + '/images/' + req.file.filename
  }

  const profile = new Profile({
    _id: req.body.id,
    username: req.body.username,
    bio: req.body.bio,
    imagePath: imagePath,
    creator: req.userData.userId
  })

  Profile.updateOne(
    { _id: req.params.id, creator: req.userData.userId },
    profile
  )
    .then((result) => {
      if (result) {
        res.status(200).json({ message: 'Update successful!' })
      } else {
        res.status(500).json({ message: 'Error Upating Profile' })
      }
    })
    .catch((e) => {
      res.status(500).json({ message: 'Error Upating Profile ,Username taken' })
      console.log(e)
    })
}

const oceProfileGetController1 = (req, res, next) => {
  Profile.find()
    .then((prof) => {
      if (prof) {
        res.status(200).json({
          message: 'Profile fetched successfully!',
          profile: prof
        })
      } else {
        res.status(404).json({ message: 'Profile not found!' })
      }
    })
    .catch((e) => {
      console.log(e)
    })
}

const oceProfileGetController2 = (req, res, next) => {
  Profile.findOne({ creator: req.userData.userId }).then((prof) => {
    if (prof) {
      res.status(200).json({
        message: 'Profile fetched successfully!',
        profile: prof
      })
    } else {
      res.status(404).json({ message: 'Profile not found!' })
    }
  })
}

const oceProfileGetController3 = (req, res, next) => {
  Profile.findOne({ creator: req.params.id }).then((prof) => {
    if (prof) {
      res.status(200).json({
        message: 'Profile fetched successfully!',
        profile: prof
      })
    } else {
      res.status(404).json({ message: 'Profile not found!' })
    }
  })
}

const oceProfileGetController4 = (req, res, next) => {
  let user
  let creatorId
  Profile.findOne({ username: req.params.id })
    .then((prof) => {
      if (prof) {
        user = prof
        return Post.find({ creator: user.creator })
      }
    })
    .then((post) => {
      res.status(200).json({
        message: 'Post fetched successfully!',
        post: post
      })
    })
    .catch((e) => {
      console.log(e)
      res.status(404).json({ message: 'error Fetching Post!' })
    })
}

const oceProfileGetController5 = (req, res, next) => {
  let creatorId
  Profile.findOne({ username: req.params.id }).then((prof) => {
    if (prof) {
      res.status(200).json({
        message: 'Profile fetched successfully!',
        profile: prof
      })
    } else {
      res.status(404).json({ message: 'Profile not found!' })
    }
  })
}

// User Controllers
const oceUserPostController1 = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new oceAuthModel({
      email: req.body.email,
      password: hash
    })

    oceAuthModel
      .findOne({ email: req.body.email })
      .then((user1) => {
        if (user1) {
          return res.status(401).json({
            message: 'User Already Exist'
          })
        }

        user.save().then((result) => {
          if (!result) {
            return res.status(500).json({
              message: 'Error Creating USer'
            })
          }
          res.status(201).json({
            message: 'User created!',
            result: result
          })
        })
      })
      .catch((err) => {
        res.status(500).json({
          error: err
        })
      })
  })
}

const oceUserPostController2 = (req, res, next) => {
  let fetchedUser

  oceAuthModel
    .findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth failed no such user'
        })
      }
      fetchedUser = user
      return bcrypt.compare(req.body.password, user.password)
    })
    .then((result) => {
      console.log(fetchedUser)
      if (!result) {
        return res.status(401).json({
          message: 'Auth failed inccorect password'
        })
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        'secret_this_should_be_longer',
        { expiresIn: '1h' }
      )
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      })
    })
    .catch((e) => {
      console.log(e)
    })
}

module.exports = {
  ocePostFormData,
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
}
