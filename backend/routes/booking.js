const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/auth');
const { createBooking, getBookings, updateBookingStatus } = require('../controllers/bookingController');
const { body, param } = require('express-validator');
const validate = require('../middleware/validate');

// Authenticated users can create bookings
router.post('/', auth, [
  body('productId').isMongoId(),
  body('name').isString().isLength({ min: 2 }),
  body('email').isEmail(),
  body('phone').isString().isLength({ min: 7 }),
], validate, createBooking);

// Admin can view all, users can view their own
router.get('/', auth, getBookings);

// Admin can update booking status
router.patch('/:id/status', auth, admin, [
  param('id').isMongoId(),
  body('status').isIn(['pending', 'confirmed', 'cancelled'])
], validate, updateBookingStatus);

module.exports = router; 