const Product = require('../models/Product');
const { uploadToCloudinary, destroyFromCloudinary } = require('../utils/cloudinary');

exports.createProduct = async (req, res) => {
  try {
    const { title, description, category, condition, availability } = req.body;
    let imageUrl = '';
    let imagePublicId = '';
    
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
    }
    
    const product = await Product.create({
      title, description, category, condition, availability, image: imageUrl, imagePublicId
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { category, condition, page = 1, limit = 12 } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (condition) filter.condition = condition;
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Product.countDocuments(filter);
    res.json({ products, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { title, description, category, condition, availability } = req.body;
    let update = { title, description, category, condition, availability };
    
    if (req.file) {
      const existing = await Product.findById(req.params.id);
      if (!existing) return res.status(404).json({ message: 'Product not found' });
      
      if (existing.imagePublicId) {
        await destroyFromCloudinary(existing.imagePublicId);
      }
      
      const result = await uploadToCloudinary(req.file.buffer);
      update.image = result.secure_url;
      update.imagePublicId = result.public_id;
    }
    
    const product = await Product.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.imagePublicId) {
      await destroyFromCloudinary(product.imagePublicId);
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 