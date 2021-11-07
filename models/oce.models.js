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

module.exports = { oceContactModel }
