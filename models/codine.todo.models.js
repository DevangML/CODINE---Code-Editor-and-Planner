const mongoose = require('mongoose');

const codineToDoSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const CodineToDoModel = mongoose.model('todo', codineToDoSchema);

module.exports = { CodineToDoModel };
