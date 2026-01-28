const { connectDB } = require('../config/db'); // Import the connection function
const Product = require('../models/Product');
const Booking = require('../models/Booking');
const User = require('../models/User');

exports.getStats = async (req, res) => {
  try {
    // Ensure DB is connected before proceeding
    await connectDB();
    
    const [products, bookings, users, totalViews] = await Promise.all([
      Product.countDocuments(),
      Booking.countDocuments(),
      User.countDocuments(),
      Product.aggregate([{ $group: { _id: null, views: { $sum: '$views' } } }])
    ]);
    res.json({
      totalProducts: products,
      totalBookings: bookings,
      totalUsers: users,
      totalViews: totalViews[0]?.views || 0
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRecentActivity = async (req, res) => {
  try {
    // Ensure DB is connected before proceeding
    await connectDB();
    
    const recentProducts = await Product.find().sort({ createdAt: -1 }).limit(5);
    const recentBookings = await Booking.find().populate('product user').sort({ createdAt: -1 }).limit(5);
    res.json({ recentProducts, recentBookings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};