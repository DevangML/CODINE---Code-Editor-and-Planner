const mongoose = require('mongoose');

const oceContactSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true,
  },
  Email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Phone: {
    type: Number,
    required: true,
    trim: true,
  },
  Message: {
    type: String,
    required: true,
    trim: true,
  },
});

const OceContactModel = mongoose.model('contact', oceContactSchema);

const oceToDoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const OceToDoModel = mongoose.model('toDo', oceToDoSchema);

const oceAuthSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  avatar: { type: String },
  date: {
    type: Date,
    default: Date.now,
  },
});

const OceAuthModel = mongoose.model('user', oceAuthSchema);

module.exports = { OceContactModel, OceToDoModel, OceAuthModel };
