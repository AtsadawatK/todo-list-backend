/* mongodb+srv://atsadawatkontha:<db_password>@cluster0.0ofvb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 */

const express = require('express')
const mongoose = require('mongoose');
const Task = require('./models/todolist')
const cors = require('cors')
const app = express()

app.use(express.json());
app.use(cors())


const connectDB = async () => {
  try {
      const conn = await mongoose.connect(
          'mongodb+srv://atsadawatkontha:qOJMYWrvt2GkH0xn@cluster0.0ofvb.mongodb.net/task?retryWrites=true&w=majority&appName=Cluster0'
      );
      console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
      console.error('MongoDB connection error', error);
      process.exit(1);
  }
};

connectDB()



 app.get('/', async (req, res) => {
  const task = await Task.find({});
  res.json(task);
});

app.post('/products', async (req, res) => {
  try {
    const { name, detail } = req.body;
    const newProduct = new Product({ name, detail  });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Failed to create product' });
  }
});


  app.listen(3002,()=>{
    console.log("Running is App")
  })
