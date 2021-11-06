const mongoose = require('mongoose')

let oceContactModel = mongoose.model('Contact', {
  Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Phone: {
    type: Number,
    required: true
  },
  Message: {
    type: String,
    required: true
  }
})

const oceProfileModel = mongoose.model('Profile', {
  username: {
    type: String,
    required: true,
    unique: true
  },

  bio: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  },

  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

const oceAuthModel = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  }
})

module.exports = { oceContactModel, oceProfileModel, oceAuthModel }