const mongoose = require('mongoose');
const { connectDB } = require('../config/db'); // Import the connection function

// Make sure to connect before using the model
connectDB().catch(console.error);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);