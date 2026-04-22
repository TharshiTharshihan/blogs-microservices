
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(express.json());


mongoose.connect("mongodb://localhost:27017/task-db").then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB", err.message);
});

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId :{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now }
});

const taskModel = mongoose.model("Task", taskSchema);


//create
app.get("/", (req,res)=>{
    res.send("welcome to task service")
})

app.post("/tasks", async (req, res) => {
  const task = req.body;

  if (!task.title || !task.description || !task.userId) {
    return res.status(400).json({ message: "Fill all fields" });
  }
  const newTask = new taskModel(task);

  try {
    await newTask.save();
    res.status(201).json({ status: "success", data: newTask });
  } catch (err) {
    console.error("Error in task", err.message);
    res.status(500).json({ success: false, message: "server error" });
  }
});



const port = 3003;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

