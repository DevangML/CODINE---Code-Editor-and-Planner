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

const oceContactModel = mongoose.model('contact', oceContactSchema);

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

const oceToDoModel = mongoose.model('toDo', oceToDoSchema);

module.exports = { oceContactModel, oceToDoModel };
