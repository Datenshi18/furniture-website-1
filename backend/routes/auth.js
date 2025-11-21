const express = require('express');
const router = express.Router();
const { register, login, forgotPassword, resetPassword } = require('../controllers/authController');
const { body } = require('express-validator');
const validate = require('../middleware/validate');

router.post('/register', [
  body('name').isString().isLength({ min: 2 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
], validate, register);
router.post('/login', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
], validate, login);
router.post('/forgot-password', [
  body('email').isEmail(),
], validate, forgotPassword);
router.post('/reset-password', [
  body('token').isString().notEmpty(),
  body('uid').isString().notEmpty(),
  body('password').isLength({ min: 6 }),
], validate, resetPassword);

module.exports = router; 