import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';

// Import Database configuration
import connectDB from './config/database.js';

// Import Global Error Handler
import errorHandler from './middleware/errorHandler.js';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import leadRoutes from './routes/leadRoutes.js';

// Import User Model for seeding
import User from './models/User.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// ==========================================
// Security & Middleware Configuration
// ==========================================

// Set security HTTP headers
app.use(helmet());

// Request logging
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// CORS setup
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.FRONTEND_URL,
].filter(Boolean);

console.log('🌐 CORS allowed origins:', allowedOrigins);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Body parsers
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// ==========================================
// Routes
// ==========================================

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date()
  });
});

// Register API routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// Base route for sanity check
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ==========================================
// Error Handling
// ==========================================
app.use(errorHandler);

// ==========================================
// Seeding Logic
// ==========================================
const seedAdminUser = async () => {
  try {
    const adminEmail = 'admin@example.com';
    const adminPassword = '123456';
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      console.log('🌱 Database - Seeding admin user...');
      // Note: User.create triggers the pre-save hook to hash the password
      await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
        isActive: true,
      });
      console.log('✅ Database - Admin user seeded successfully');
    } else {
      console.log('ℹ️ Database - Admin user already exists');
    }
  } catch (error) {
    console.error('❌ Database - Error seeding admin user:', error.message);
  }
};

// ==========================================
// Server Initialization
// ==========================================

const checkRequiredEnvVars = () => {
  const required = ['MONGODB_URI', 'JWT_SECRET'];
  const missing = required.filter(envVar => !process.env[envVar] && !process.env[envVar.replace('MONGODB_', 'MONGO_')]);

  if (missing.length > 0) {
    console.error(`ERROR: Missing required environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }
};

const startServer = async () => {
  // Validate env
  checkRequiredEnvVars();

  // Connect to DB
  await connectDB();

  // Seed Admin user
  await seedAdminUser();

  const PORT = process.env.PORT || 5000;
  const MODE = process.env.NODE_ENV || 'development';

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${MODE} mode`);
  });

  const gracefulShutdown = async () => {
    console.log('\nServer shutting down gracefully...');
    server.close(async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed cleanly.');
      process.exit(0);
    });

    setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
};

startServer();
