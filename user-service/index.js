
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(express.json());


mongoose.connect("mongodb://localhost:27017/user-db").then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB", err.message);
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  
});

const userModel = mongoose.model("User", userSchema);


//create
app.get("/", (req,res)=>{
    res.send("welcome to user service")
})

app.post("/users", async (req, res) => {
  const user = req.body;

  if (!user.name || !user.email) {
    return res.status(400).json({ message: "Fill all fields" });
  }
  const newUser = new userModel(user);

  try {
    await newUser.save();
    res.status(201).json({ status: "success", data: newUser });
  } catch (err) {
    console.error("Error in user", err.message);
    res.status(500).json({ success: false, message: "server error" });
  }
});

// get all

app.get("/users", async (req, res) => {
  try {
    const users = await userModel.find({}).sort({ createdAt: -1 });
    res.status(200).json({ status: "success", data: users });
  } catch (err) {
    console.error("Error in user", err.message);
    res.status(500).json({ success: false, message: "server error" });
  }
});

// Get a single user by ID
app.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found." });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

