// Database connection management
let dbConnection = null;

const mongoose = require('mongoose');

/**
 * Reusable function to ensure MongoDB connection is established
 * @returns {Promise<mongoose.Connection>} The connected database instance
 */
async function connectDB() {
  // If already connected, return the existing connection
  if (dbConnection && dbConnection.readyState === 1) {
    return dbConnection;
  }

  // Check if already connecting
  if (dbConnection && dbConnection.readyState === 2) {
    // Wait for connection to be established
    return new Promise((resolve, reject) => {
      dbConnection.once('connected', () => resolve(dbConnection));
      dbConnection.once('error', (err) => reject(err));
    });
  }

  try {
    // Configure Mongoose to not buffer commands
    mongoose.set('bufferCommands', false);
    mongoose.set('bufferTimeoutMS', 0);

    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not defined');
    }

    // Connect to MongoDB
    dbConnection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully');

    return dbConnection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

module.exports = { connectDB };