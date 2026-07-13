import express from 'express';
import { check } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { protect } from '../middleware/auth.js';
import {
  register,
  login,
  getProfile,
  updateProfile,
} from '../controllers/authController.js';

const router = express.Router();

// Define validation rules for register (name, email, password)
const registerValidation = [
  check('name', 'Name is required').notEmpty().trim(),
  check('email', 'Please include a valid email').isEmail().normalizeEmail(),
  check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
];

// Define validation rules for login (email, password)
const loginValidation = [
  check('email', 'Please include a valid email').isEmail().normalizeEmail(),
  check('password', 'Password is required').notEmpty(),
];

// Wire up routes
router.post('/register', validate(registerValidation), register);

// PRODUCTION NOTE: Add express-rate-limit middleware to this route
// to prevent brute-force attacks against user credentials.
router.post('/login', validate(loginValidation), login);

router.get('/profile', protect, getProfile);

router.put('/profile', protect, updateProfile);

export default router;
