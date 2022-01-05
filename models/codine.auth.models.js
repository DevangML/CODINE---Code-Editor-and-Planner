const mongoose = require('mongoose');

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

const CodineAuthModel = mongoose.model('auth', codineAuthSchema);

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

const CodineGoogleAuthModel = mongoose.model('googleauth', googleAuthSchema);

const codineUserSchema = new mongoose.Schema({
  userId: { type: String, unique: true, required: true },
  fullName: { type: String, required: true },
  email: {
    type: String,
    required: true,
  },
  // phone: { type: Number, required: true, trim: true, default: null },
});

const CodineUserModel = mongoose.model('user', codineUserSchema);

module.exports = { CodineAuthModel, CodineGoogleAuthModel, CodineUserModel };
