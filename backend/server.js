const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL, 'https://your-domain.vercel.app']
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

// Request logging
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('MongoDB connected');
    console.log('Environment check:');
    console.log('- Cloudinary Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
    console.log('- JWT Secret length:', process.env.JWT_SECRET?.length || 0);
    
    // Initialize database with default admin user
    const { initializeDatabase } = require('./initDatabase');
    await initializeDatabase();
  })
  .catch((err) => console.error('MongoDB connection error:', err));

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const bookingRoutes = require('./routes/booking');
const analyticsRoutes = require('./routes/analytics');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error('Error occurred:', err.message);
  console.error('Stack:', err.stack);
  res.status(500).json({ message: err.message || 'Server error' });
});

// Test route
app.get('/', (req, res) => {
  res.send('Furniture Tirth API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 