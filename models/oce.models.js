const mongoose = require('mongoose');

const oceContactSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, 'Name Required'],
    trim: true,
    min: [0, 'Name is too short'],
  },
  Email: {
    type: String,
    required: [true, 'Email Required'],
    trim: true,
    unique: true,
    min: [0, 'Email is too short'],
  },
  Phone: {
    type: Number,
    required: [true, 'Phone Number Required'],
    trim: true,
    min: [10, 'Phone number is invalid'],
  },
  Message: {
    type: String,
    required: [true, 'Message Required'],
    trim: true,
    min: [0, 'Message is empty'],
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
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  date: {
    type: Date,
    default: Date.now,
  },
});

const OceAuthModel = mongoose.model('user', oceAuthSchema);

const googleAuthSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  fullName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  photoUrl: { type: String, required: true },
});

const OceGoogleAuthModel = mongoose.model('googleuser', googleAuthSchema);

module.exports = {
  OceContactModel,
  OceToDoModel,
  OceAuthModel,
  OceGoogleAuthModel,
};
