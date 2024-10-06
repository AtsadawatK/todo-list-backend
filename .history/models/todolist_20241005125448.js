const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// กำหนด Schema สำหรับ Nike Shoes
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
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    default: 'Nike',
  },
  stock: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

// สร้างโมเดล
const Shoe = mongoose.model('Shoe', shoeSchema);

module.exports = Shoe;
