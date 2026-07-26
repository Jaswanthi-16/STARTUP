import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
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

// Request logging improvement
// Use morgan('combined') format in production, morgan('dev') format in development
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// Update CORS for production
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.FRONTEND_URL,
  'https://your-app.vercel.app'
].filter(Boolean);

console.log('🌐 CORS allowed origins:', allowedOrigins);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Body parser, reading data from body into req.body and limiting size to 10kb
app.use(express.json({ limit: '10kb' }));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
// General rate limit: 100 requests per 15 minutes per IP
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.'
});

// Auth rate limit (stricter): 100 requests per 15 minutes during testing
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many auth attempts.'
});

app.use('/api/', generalLimiter);
app.use('/api/auth/', authLimiter);

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

// ==========================================
// Error Handling
// ==========================================

// Register global error handler LAST (after all routes)
app.use(errorHandler);

// ==========================================
// Server Initialization
// ==========================================

// Environment validation on startup
const checkRequiredEnvVars = () => {
  const required = ['MONGODB_URI', 'JWT_SECRET', 'PORT'];
  const missing = required.filter(envVar => !process.env[envVar] && !process.env[envVar.replace('MONGODB_', 'MONGO_')]);

  if (missing.length > 0) {
    console.error(`ERROR: Missing required environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }
};

// Seeding logic for admin user
const seedAdminUser = async () => {
  try {
    const adminEmail = 'admin@example.com';
    const adminPassword = '123456';
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      console.log('🌱 Database - Seeding admin user...');
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

// Connect to MongoDB and start the Express server
const startServer = async () => {
  // 1. Validate environment variables before connecting
  checkRequiredEnvVars();

  // 2. Connect to database
  await connectDB();

  // 3. Seed admin user
  await seedAdminUser();

  // 4. Define port and environment
  const PORT = process.env.PORT || 5000;
  const MODE = process.env.NODE_ENV || 'development';

  // 5. Start listening for incoming requests
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${MODE} mode`);
  });

  // 6. Graceful shutdown
  const gracefulShutdown = async () => {
    console.log('\nServer shutting down gracefully...');
    server.close(async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed cleanly.');
      process.exit(0);
    });

    // Force close server after 10 secs
    setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);
  };

  // Handle process.SIGTERM and process.SIGINT signals
  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
};

// Execute server startup
startServer();
