const Booking = require('../models/Booking');
const Product = require('../models/Product');
const { sendEmail } = require('../utils/email');
const mongoose = require('mongoose');

exports.createBooking = async (req, res) => {
  try {
    const { productId, name, email, phone, message } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    const booking = await Booking.create({
      product: productId,
      name,
      email,
      phone,
      message,
      user: req.user ? req.user._id : undefined
    });
    // Send email to admin
    await sendEmail(
      process.env.EMAIL_USER,
      'New Product Booking',
      `<h3>New Booking for ${product.title}</h3><p>Name: ${name}</p><p>Email: ${email}</p><p>Phone: ${phone}</p><p>Message: ${message}</p>`
    );
    // (Optional) Send confirmation to user
    if (email) {
      await sendEmail(
        email,
        'Booking Confirmation',
        `<h3>Your booking for ${product.title} has been received.</h3><p>We will contact you soon.</p>`
      );
    }
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    // Admin: get all bookings, User: get own bookings
    let bookings;
    if (req.user && req.user.role === 'admin') {
      bookings = await Booking.find().populate('product user').sort({ createdAt: -1 });
    } else {
      bookings = await Booking.find({ user: req.user._id }).populate('product').sort({ createdAt: -1 });
    }
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 

exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid booking id' });
    }
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('product user');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};