import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });
dotenv.config({ path: path.join(__dirname, '.env') });

async function createSampleUsers() {
  try {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!uri) throw new Error("No MONGODB_URI or MONGO_URI found in environment variables");
    
    await mongoose.connect(uri);
    console.log('Connected to DB');
    
    const User = mongoose.connection.collection('users');
    
    // Seed Sample User
    const sampleEmail = 'sample@example.com';
    const samplePassword = 'password123';
    const existingSample = await User.findOne({ email: sampleEmail });
    
    if (existingSample) {
      console.log('Sample user already exists:', sampleEmail);
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(samplePassword, salt);
      
      await User.insertOne({
        name: 'Sample User',
        email: sampleEmail,
        password: hashedPassword,
        role: 'user',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log('Created sample user:', sampleEmail);
    }

    // Seed/Reset Admin User
    const adminEmail = 'admin@example.com';
    const adminPassword = '123456';
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    if (existingAdmin) {
      console.log('Admin user already exists. Resetting password...');
      await User.updateOne(
        { email: adminEmail },
        { 
          $set: { 
            password: hashedPassword,
            name: 'Admin User',
            role: 'admin',
            isActive: true,
            updatedAt: new Date()
          } 
        }
      );
      console.log('Admin user password reset successfully');
    } else {
      await User.insertOne({
        name: 'Admin User',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log('Created admin user:', adminEmail);
    }

  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createSampleUsers();
