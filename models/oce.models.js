const mongoose = require('mongoose');

const oceContactSchema = new mongoose.Schema({
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
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

const OceAuthModel = mongoose.model('User', oceAuthSchema);

module.exports = { OceContactModel, OceToDoModel, OceAuthModel };
