const mongoose = require('mongoose');

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

const CodineToDoModel = mongoose.model('todo', codineToDoSchema);

module.exports = { CodineToDoModel };
