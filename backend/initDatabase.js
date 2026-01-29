const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function initializeDatabase() {
  try {
    console.log('🔄 Initializing database...');
    
    // Skip admin creation - no default admin will be created
    console.log('ℹ️  Skipping default admin user creation');
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
  }
}

module.exports = { initializeDatabase };