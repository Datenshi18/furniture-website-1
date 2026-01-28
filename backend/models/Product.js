const mongoose = require('mongoose');
const { connectDB } = require('../config/db'); // Import the connection function

// Make sure to connect before using the model
connectDB().catch(console.error);

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  condition: { type: String, enum: ['new', 'used'], required: true },
  image: { type: String, required: true },
  imagePublicId: { type: String },
  availability: { type: Boolean, default: true },
  views: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);