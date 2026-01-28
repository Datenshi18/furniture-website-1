const { connectDB } = require('../config/db'); // Import the connection function
const User = require('../models/User');
const ResetToken = require('../models/ResetToken');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendEmail } = require('../utils/email');

exports.register = async (req, res) => {
  try {
    // Ensure DB is connected before proceeding
    await connectDB();
    
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    // Ensure DB is connected before proceeding
    await connectDB();
    
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 

exports.forgotPassword = async (req, res) => {
  try {
    // Ensure DB is connected before proceeding
    await connectDB();
    
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(200).json({ message: 'If that email exists, a reset link was sent' });

    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 30); // 30 minutes

    await ResetToken.deleteMany({ user: user._id });
    await ResetToken.create({ user: user._id, tokenHash, expiresAt });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}&uid=${user._id}`;
    await sendEmail(email, 'Password Reset', `<p>Click the link to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`);
    res.json({ message: 'If that email exists, a reset link was sent' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    // Ensure DB is connected before proceeding
    await connectDB();
    
    const { token, uid, password } = req.body;
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const record = await ResetToken.findOne({ user: uid, tokenHash, expiresAt: { $gt: new Date() } });
    if (!record) return res.status(400).json({ message: 'Invalid or expired token' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(uid, { password: hashedPassword });
    await ResetToken.deleteMany({ user: uid });
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};