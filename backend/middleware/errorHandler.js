import { errorResponse } from '../utils/apiResponse.js';

/**
 * Global Express error handling middleware.
 */
const errorHandler = (err, req, res, next) => {
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
    const field = Object.keys(err.keyValue || { Email: 1 })[0];
    const message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    return errorResponse(res, message, 409);
  }

  // Mongoose ValidationError
  if (err.name === 'ValidationError') {
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
  
  const responseData = {
    success: false,
    message: defaultMessage,
    errors: null,
  };

  if (process.env.NODE_ENV === 'development') {
    responseData.stack = err.stack;
  }

  return res.status(statusCode).json(responseData);
};

export default errorHandler;
