const mongoose = require('mongoose');

const codineContactSchema = new mongoose.Schema({
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

const CodineContactModel = mongoose.model('contact', codineContactSchema);

const codineToDoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const CodineToDoModel = mongoose.model('toDo', codineToDoSchema);

const codineAuthSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  date: {
    type: Date,
    default: Date.now,
  },
});

const CodineAuthModel = mongoose.model('user', codineAuthSchema);

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

const CodineGoogleAuthModel = mongoose.model('googleuser', googleAuthSchema);

module.exports = {
  CodineContactModel,
  CodineToDoModel,
  CodineAuthModel,
  CodineGoogleAuthModel,
};
