const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const shoeSchema = new Schema({
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

const Task = mongoose.model('Task', shoeSchema);

module.exports = Task;
