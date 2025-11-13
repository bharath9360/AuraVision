// server/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Models
const User = require('./models/User');
const Face = require('./models/Face');

dotenv.config();
const app = express();

app.use(cors());
// Limit-a 50mb aakirom, appo thaan photo upload aagum
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// --- ROUTES ---

// 1. AUTH: Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { fullName, email, password, userType, deviceId } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ fullName, email, password, userType, deviceId });
    await newUser.save();
    res.status(201).json({ message: "User registered", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// 2. AUTH: Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.password !== password) return res.status(400).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// 3. USER: Get Profile (For Settings Screen)
app.get('/api/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
});

// 4. USER: Update Settings (For Settings Screen)
app.put('/api/user/:id/settings', async (req, res) => {
  try {
    const { settings } = req.body; // { darkMode: true, narrationSpeed: 80, ... }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { settings: settings } },
      { new: true }
    );
    res.json({ message: "Settings updated", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating settings" });
  }
});

// 5. FACES: Add New Person (For AddPersonScreen)
app.post('/api/faces/add', async (req, res) => {
  try {
    const { userId, name, imageUrl } = req.body;
    const newFace = new Face({ userId, name, imageUrl });
    await newFace.save();
    res.status(201).json({ message: "Person added successfully", face: newFace });
  } catch (error) {
    res.status(500).json({ message: "Error adding person" });
  }
});

// 6. FACES: Get All People (For History/Detection)
app.get('/api/faces/:userId', async (req, res) => {
  try {
    const faces = await Face.find({ userId: req.params.userId });
    res.json(faces);
  } catch (error) {
    res.status(500).json({ message: "Error fetching faces" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});