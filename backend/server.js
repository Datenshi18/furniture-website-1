const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

console.log('Cloudinary config check:');
console.log('- Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('- API Key exists:', !!process.env.CLOUDINARY_API_KEY);
console.log('- API Secret exists:', !!process.env.CLOUDINARY_API_SECRET);

const app = express();
const PORT = process.env.PORT || 5000;

// Robust CORS setup
const corsOptions = {
  origin: (origin, callback) => {
    const allowed = [
      process.env.FRONTEND_URL,        // your Vercel site
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:5176',
    ];

    // Allow requests with no origin (Postman, server-to-server, etc.)
    if (!origin) return callback(null, true);

    if (allowed.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Request logging (dev only)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Import the connection function
const { connectDB } = require('./config/db');

// Connect to database and initialize
connectDB()
  .then(async () => {
    console.log('Environment check:');
    console.log('- Cloudinary Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
    console.log('- JWT Secret length:', process.env.JWT_SECRET?.length || 0);

    // Initialize database with default admin user
    const { initializeDatabase } = require('./initDatabase');
    await initializeDatabase();
  })
  .then(() => {
    // Routes
    const authRoutes = require('./routes/auth');
    const productRoutes = require('./routes/product');
    const bookingRoutes = require('./routes/booking');
    const analyticsRoutes = require('./routes/analytics');

    app.use('/api/auth', authRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/bookings', bookingRoutes);
    app.use('/api/analytics', analyticsRoutes);

    // Test route
    app.get('/', (req, res) => {
      res.send('Furniture Tirth API is running');
    });

    // Error handler
    app.use((err, req, res, next) => {
      console.error('Error occurred:', err.message);
      console.error('Stack:', err.stack);
      res.status(500).json({ message: err.message || 'Server error' });
    });

    // Start server only after DB connection is established
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit if unable to connect to database
  });