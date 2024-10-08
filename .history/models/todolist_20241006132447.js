const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: false,
  },
  checked: {
    type: Boolean,
    required: true,
  },
}, { timestamps: false, versionKey: false });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
