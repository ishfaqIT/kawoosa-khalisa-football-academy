const mongoose = require('mongoose');
require('dotenv').config();

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    console.log('🔗 Attempting to connect to MongoDB...');
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    if (!mongoURI) {
      console.error('❌ MONGODB_URI is missing!');
      throw new Error('MongoDB URI is not defined');
    }

    const db = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000, // 10 seconds
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4
    });

    isConnected = db.connections[0].readyState;
    console.log('✅ MongoDB connected successfully to:', db.connection.name);
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    throw error;
  }
};

module.exports = { connectDB };
