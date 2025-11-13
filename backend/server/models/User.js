// server/models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ['VISUALLY_IMPAIRED', 'GUIDE'],
    required: true,
  },
  deviceId: {
    type: String,
    default: '',
  },
  // --- UPDATED: Ella Settings-um Ivide Irukku ---
  settings: {
    darkMode: { type: Boolean, default: true },
    hapticFeedback: { type: Boolean, default: true },
    narrationSpeed: { type: Number, default: 50 },
    lowBatteryAlerts: { type: Boolean, default: true },
    connectionStatus: { type: Boolean, default: false },
    guideMessages: { type: Boolean, default: true },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);