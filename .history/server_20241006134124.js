/* mongodb+srv://atsadawatkontha:<db_password>@cluster0.0ofvb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 */

const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/todolist");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://atsadawatkontha:qOJMYWrvt2GkH0xn@cluster0.0ofvb.mongodb.net/task?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error", error);
    process.exit(1);
  }
};

connectDB();

app.get("/tasks", async (req, res) => {
  const task = await Task.find({});
  res.json(task);
});

app.post("/addtask", async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const newTask = new Task({ title, description, date });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Failed to create task" });
  }
});

app.delete("/deletetask/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
});

app.patch("/updatecheckedtask/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { checked } = req.body;

    // อัปเดตข้อมูลของ task ที่ตรงกับ ID
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, date },
      { new: true } // ส่งค่ากลับเป็น task ที่อัปเดตแล้ว
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
});

app.listen(3002, () => {
  console.log("Running is App");
});
