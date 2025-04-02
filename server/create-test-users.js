require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const readline = require('readline');

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ingobyi';

// Available roles in the system
const AVAILABLE_ROLES = ['patient', 'driver', 'emt', 'hospital', 'insurance', 'admin'];

// Create interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Promisify readline question
const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function createUser(userData) {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      console.log('\nUser already exists with this email');
      return null;
    }

    // Create new user
    const user = new User(userData);
    await user.save();

    console.log('\nUser created successfully:', {
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      status: user.status
    });
    return user;
  } catch (error) {
    console.error('\nError creating user:', error);
    return null;
  }
}

async function main() {
  try {
    // Connect to MongoDB
    console.log('\nConnecting to MongoDB...');
    await mongoose.connect(MONGO_URI, mongoOptions);
    console.log('Connected to MongoDB successfully\n');

    while (true) {
      console.log('\nAvailable roles:', AVAILABLE_ROLES.join(', '));
      
      // Get user input
      const role = await question('\nEnter role (or "exit" to quit): ');
      if (role.toLowerCase() === 'exit') break;
      
      if (!AVAILABLE_ROLES.includes(role)) {
        console.log('\nInvalid role! Please choose from the available roles.');
        continue;
      }

      const email = await question('Enter email: ');
      const password = await question('Enter password: ');
      const fullName = await question('Enter full name: ');
      const phone = await question('Enter phone number: ');
      const nationalId = await question('Enter national ID: ');

      const userData = {
        email,
        password,
        fullName,
        phone,
        nationalId,
        role,
        status: 'approved'
      };

      await createUser(userData);
      
      const createAnother = await question('\nCreate another user? (yes/no): ');
      if (createAnother.toLowerCase() !== 'yes') break;
    }

  } catch (error) {
    console.error('\nError:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
    rl.close();
  }
}

// Run the script
main();
