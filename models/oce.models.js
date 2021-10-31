const mongoose = require('mongoose')

let oceSchema = new mongoose.Schema({
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

let oceAuthSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: { type: String, required: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
)

const contactSender = mongoose.model('contact', oceSchema)
const userAuthModel = mongoose.model('auth', oceAuthSchema)

module.exports = { contactSender, userAuthModel }
