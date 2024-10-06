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

app.post('/addtask', async (req, res) => {
    try {
      const { title, description, date } = req.body;
      const newTask = new Task({ title, description, date });
      const savedTask = await newTask.save();
      res.status(201).json(savedTask);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ message: 'Failed to create task' });
    }
  });


  
/* app.patch('/updatetask/:id', async (req, res) => {
    try {
      const { id } = req.params;  // รับ id จาก URL
      const { title, description } = req.body;  // รับข้อมูลใหม่จาก body

      // ใช้ findByIdAndUpdate เพื่ออัปเดตรายการ
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { title, description },  // ค่าใหม่ที่ต้องการอัปเดต
        { new: true }  // ส่งผลลัพธ์ที่อัปเดตกลับมา
      );

      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }

      res.json(updatedTask);  // ส่งข้อมูล task ที่อัปเดตกลับไป
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ message: 'Failed to update task' });
    }
  }); */



  app.listen(3002,()=>{
    console.log("Running is App")
  })
