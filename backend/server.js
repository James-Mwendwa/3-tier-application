const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const mongoDbUrl = process.env.MONGODB_URL;

// Connect to MongoDB
mongoose.connect(mongoDbUrl, {});

// Define a model
const User = mongoose.model("User", new mongoose.Schema({ name: String }));

// Routes
app.get("/", (req, res) => res.send("Backend is running"));

app.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
