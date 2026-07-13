import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Helper function to generate JWT token
 */
const generateToken = (userId) => {
  console.log('🔑 Backend - Generating JWT for userId:', userId);
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
  return token;
};

/**
 * Register a new user
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log('📝 Backend - Register request received for email:', email);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ Backend - Email already exists:', email);
      return res.status(409).json({ success: false, message: 'Email already exists' });
    }

    const user = await User.create({ name, email, password });
    console.log('✅ Backend - User created with ID:', user._id);

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    console.error('❌ Backend - Register error:', error.message);
    next(error);
  }
};

/**
 * Login user
 */
export const login = async (req, res, next) => {
  try {
    console.log('Incoming login request');
    const { email, password } = req.body;
    console.log(`Email received: ${email}`);

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      console.log('❌ User not found');
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    console.log('User found');

    // Compare password using bcrypt.compare()
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      console.log('❌ Password does not match');
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    console.log('Password matched');

    if (user.isActive === false) {
      console.log('❌ Account is deactivated');
      return res.status(403).json({ success: false, message: 'Account is deactivated' });
    }

    const token = generateToken(user._id);
    console.log('JWT generated');

    console.log('Response sent');
    return res.status(200).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    console.error('❌ Login error:', error.message);
    next(error);
  }
};

/**
 * Get current user profile
 */
export const getProfile = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update user profile
 */
export const updateProfile = async (req, res, next) => {
  try {
    const { name, oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');

    if (name) {
      user.name = name;
    }

    if (newPassword) {
      if (!oldPassword) {
        return res.status(400).json({ success: false, message: 'Please provide your old password to set a new one' });
      }
      const isMatch = await user.comparePassword(oldPassword);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Old password is incorrect' });
      }
      user.password = newPassword;
    }

    await user.save();
    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

export { generateToken };
