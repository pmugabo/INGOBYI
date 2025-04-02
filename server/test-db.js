require('dotenv').config();
const mongoose = require('mongoose');

// MongoDB connection options
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ingobyi';

async function testConnection() {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('Connection URI:', MONGO_URI);
    
    await mongoose.connect(MONGO_URI, mongoOptions);
    console.log('Connected to MongoDB successfully');
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\nAvailable collections:');
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });
    
    // Count users
    const usersCount = await mongoose.connection.db.collection('users').countDocuments();
    console.log(`\nNumber of users in database: ${usersCount}`);
    
    // List one user as sample (without sensitive data)
    const sampleUser = await mongoose.connection.db.collection('users')
      .findOne({}, { projection: { password: 0 } });
    if (sampleUser) {
      console.log('\nSample user (excluding password):', JSON.stringify(sampleUser, null, 2));
    }
    
  } catch (error) {
    console.error('MongoDB connection error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

testConnection();
