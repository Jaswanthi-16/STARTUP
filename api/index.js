import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';

// Import from root-level directories (relative to api/)
import errorHandler from '../middleware/errorHandler.js';
import authRoutes from '../routes/authRoutes.js';
import leadRoutes from '../routes/leadRoutes.js';
import User from '../models/User.js';

// ==========================================
// Express App Setup
// ==========================================

const app = express();

// Security headers
app.use(helmet());

// CORS — allow your Vercel domain + localhost for dev
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Body parsers
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// ==========================================
// Routes
// ==========================================

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    environment: 'vercel-serverless',
    timestamp: new Date(),
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// Error handler (must be registered LAST)
app.use(errorHandler);

// ==========================================
// MongoDB Connection Caching for Serverless
// ==========================================

let isConnected = false;

async function connectDB() {
  // If already connected, skip
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  const dbUri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!dbUri) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  try {
    await mongoose.connect(dbUri, { family: 4 });
    isConnected = true;
    console.log(`MongoDB Atlas Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
}

// Seed admin user (runs once per cold start)
let isSeeded = false;

async function seedAdminUser() {
  if (isSeeded) return;
  try {
    const adminEmail = 'admin@example.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: '123456',
        role: 'admin',
        isActive: true,
      });
      console.log('Admin user seeded');
    }
    isSeeded = true;
  } catch (error) {
    console.error('Seed error:', error.message);
    // Don't block requests if seeding fails
  }
}

// ==========================================
// Vercel Serverless Handler
// ==========================================

export default async function handler(req, res) {
  try {
    await connectDB();
    await seedAdminUser();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }

  // Delegate to Express
  return app(req, res);
}
