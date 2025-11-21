const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/auth');
const upload = require('../middleware/multer');
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// Public
router.get('/', getProducts);
router.get('/:id', getProduct);

// Admin
router.post('/', auth, admin, upload.single('image'), createProduct);
router.put('/:id', auth, admin, upload.single('image'), updateProduct);
router.delete('/:id', auth, admin, deleteProduct);

module.exports = router; 