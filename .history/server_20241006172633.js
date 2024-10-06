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


app.get("/tasks/:id", async (req, res) => {
    try {
      const { id } = req.params; // ดึงค่า id จาก URL
      const task = await Task.findById(id); // ค้นหา task ตาม id

      if (!task) {
        return res.status(404).json({ message: "Task not found" }); // หากไม่พบ Task
      }

      res.json(task); // ส่งข้อมูล Task ที่พบกลับไป
    } catch (error) {
      console.error("Error fetching task by id:", error);
      res.status(500).json({ message: "Failed to fetch task" });
    }
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

app.patch("/updatetask/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date } = req.body;

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



app.patch("/updatechecktask", async (req, res) => {
    try {
        const { checked } = req.body; // ดึงค่า checked จาก body เท่านั้น

        // อัปเดตฟิลด์ checked ของทุก task
        const result = await Task.updateMany(
            {}, // อัปเดตทุกเรคคอร์ด
            { checked }, // อัปเดตเฉพาะ checked
            { new: true } // ไม่จำเป็นต้องใช้ใน updateMany แต่สามารถใส่ได้ถ้าต้องการ
        );

        res.json({ message: "All tasks updated successfully", result });
    } catch (error) {
        console.error("Error updating tasks:", error);
        res.status(500).json({ message: "Failed to update tasks" });
    }
});


app.listen(3002, () => {
  console.log("Running is App");
});
