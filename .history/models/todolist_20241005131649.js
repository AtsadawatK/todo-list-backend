const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
