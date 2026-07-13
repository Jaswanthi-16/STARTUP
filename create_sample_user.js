import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

dotenv.config();

async function createSampleUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');
    
    // We can't import User model directly due to path issues in this script, 
    // so we'll just insert directly to collection if it doesn't exist.
    const User = mongoose.connection.collection('users');
    
    const email = 'sample@example.com';
    const password = 'password123';
    
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      console.log('Sample user already exists:');
      console.log('Email:', email);
      console.log('Password:', password);
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      await User.insertOne({
        name: 'Sample User',
        email,
        password: hashedPassword,
        role: 'admin',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log('Created sample user:');
      console.log('Email:', email);
      console.log('Password:', password);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createSampleUser();
