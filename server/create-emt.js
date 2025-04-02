require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ingobyi';

async function createEMTUser() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI, mongoOptions);
    console.log('Connected to MongoDB successfully');

    const userData = {
      email: 'emt.test@ingobyi.com',
      password: 'EMT12345',
      fullName: 'Test EMT User',
      phone: '0788123456',
      nationalId: '1199012345678901',
      role: 'emt',
      status: 'approved'
    };

    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      console.log('User already exists with this email');
      return;
    }

    // Create new user
    const user = new User(userData);
    await user.save();

    console.log('EMT user created successfully:', {
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      status: user.status
    });

  } catch (error) {
    console.error('Error creating EMT user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

createEMTUser();
