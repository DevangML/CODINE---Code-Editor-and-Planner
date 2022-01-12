const mongoose = require('mongoose');

const codineTodoSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 200 },
  author: String,
  uid: String,
  isComplete: Boolean,
  date: { type: Date, default: new Date() },
});

const CodineToDoModel = mongoose.model('todo', codineTodoSchema);

module.exports = CodineToDoModel;
