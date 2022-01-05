const mongoose = require('mongoose');

const codineContactSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: {
    type: String,
    required: [true, 'Name Required'],
    trim: true,
    min: [0, 'Name is too short'],
  },
  email: {
    type: String,
    required: [true, 'Email Required'],
    trim: true,
    unique: true,
    min: [0, 'Email is too short'],
  },
  phone: {
    type: Number,
    required: [true, 'Phone Number Required'],
    trim: true,
    min: [10, 'Phone number is invalid'],
  },
  message: {
    type: String,
    required: [true, 'Message Required'],
    trim: true,
    min: [0, 'Message is empty'],
  },
});

const CodineContactModel = mongoose.model('contact', codineContactSchema);

module.exports = { CodineContactModel };
