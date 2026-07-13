import { errorResponse } from '../utils/apiResponse.js';

/**
 * Global Express error handling middleware.
 * Captures all unhandled errors, categorizes them, and formats them into a standard response.
 * 
 * @param {Error} err - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const errorHandler = (err, req, res, next) => {
  // Log error to console for dev
  if (process.env.NODE_ENV !== 'test') {
    console.error(err);
  }

  // Mongoose CastError (e.g., invalid ObjectId)
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    return errorResponse(res, message, 404);
  }

  // MongoDB duplicate key error (code 11000)
  if (err.code === 11000) {
    // Determine the field that caused the duplicate error, defaulting to Email
    const field = Object.keys(err.keyValue || { Email: 1 })[0];
    const message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    return errorResponse(res, message, 409);
  }

  // Mongoose ValidationError
  if (err.name === 'ValidationError') {
    // Extract field-by-field error messages
    const errors = Object.values(err.errors).map((val) => val.message);
    const message = 'Validation Error';
    return errorResponse(res, message, 400, errors);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    const message = err.name === 'TokenExpiredError' 
      ? 'Your token has expired. Please log in again.' 
      : 'Invalid token. Please log in again.';
    return errorResponse(res, message, 401);
  }

  // Default Server Error Response
  const defaultMessage = err.message || 'Server error';
  const statusCode = err.statusCode || 500;
  
  // Create base error response
  const responseData = {
    success: false,
    message: defaultMessage,
    errors: null,
  };

  // In development, attach the stack trace to the response payload.
  // In production, never send stack traces.
  if (process.env.NODE_ENV === 'development') {
    responseData.stack = err.stack;
  }

  return res.status(statusCode).json(responseData);
};

export default errorHandler;
