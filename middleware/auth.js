import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Middleware to protect routes by verifying JWT tokens
 */
export const protect = async (req, res, next) => {
  let token;

  // Extracts JWT from Authorization header: 'Bearer <token>'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // If token missing
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided, access denied'
    });
  }

  try {
    // Verifies token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Finds the user in database
    const user = await User.findById(decoded.id).select('-password');

    // If user not found
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User belonging to this token no longer exists'
      });
    }

    // Attaches user to req.user and proceeds
    req.user = user;
    next();
  } catch (error) {
    // If token expired
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired, please login again'
      });
    }
    // If token invalid
    return res.status(401).json({
      success: false,
      message: 'Token is invalid'
    });
  }
};
