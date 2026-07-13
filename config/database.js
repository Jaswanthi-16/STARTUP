import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Connects to the MongoDB database using the URI from environment variables.
 * Exits the process if the connection fails.
 * 
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    // Attempt to connect to the database
    // Mongoose options as requested (Note: these are deprecated in Mongoose 6+, but included for compatibility)
    const dbUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    const conn = await mongoose.connect(dbUri, {
      family: 4,
    });

    // Log success message with the host
    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log the error and exit the process with a failure code (1)
    const dbUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    console.error(`Error connecting to MongoDB. URI used: ${dbUri?.split('@')[1]}`);
    console.error(`Detailed error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
