const mongoose = require("mongoose")

let oceSchema = new mongoose.Schema({
  Name: {
    type: String
  },
  Email: {
    type: String
  },
  Phone: {
    type: Number
  },
  Message: {
    type: String
  }
})

const contactSender = mongoose.model("contact", oceSchema)

module.exports = contactSender
