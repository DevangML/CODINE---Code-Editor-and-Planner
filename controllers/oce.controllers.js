const contactSender = require('../models/oce.models')
require('path')
require('../databases/oce.dbs')
const validateRegisterInput = require('./middlewares/auth.middleware')

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

const oceRegisterController = async (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body)
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' })
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err))
        })
      })
    }
  })
}

module.exports = {
  ocePostFormData,
  oceVanillaController,
  oceRegisterController
}
