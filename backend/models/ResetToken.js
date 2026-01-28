const mongoose = require('mongoose');
const { connectDB } = require('../config/db'); // Import the connection function

// Make sure to connect before using the model
connectDB().catch(console.error);

const resetTokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tokenHash: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true,
    expires: 0 // Automatically delete when expired
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ResetToken', resetTokenSchema);