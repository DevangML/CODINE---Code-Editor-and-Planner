const mongoose = require('mongoose');

let oceContactSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Phone: {
    type: Number,
    required: true,
  },
  Message: {
    type: String,
    required: true,
  },
});

const oceContactModel = mongoose.model('contact', oceContactSchema);

module.exports = { oceContactModel };
