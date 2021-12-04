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
  name: { type: String, required: true, trim: true, default: null },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true },
  id: { type: String, trim: true },
});

const OceAuthModel = mongoose.model('User', oceAuthSchema);

module.exports = { OceContactModel, OceToDoModel, OceAuthModel };
