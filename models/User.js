import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * User Schema defining the structure for the User document
 * @typedef {Object} User
 * @property {string} name - The full name of the user
 * @property {string} email - The unique email address of the user
 * @property {string} password - The hashed password of the user
 * @property {string} role - The role of the user (admin or user)
 * @property {boolean} isActive - Flag indicating if the user account is active
 * @property {Date} createdAt - Timestamp of when the user was created
 * @property {Date} updatedAt - Timestamp of the last update to the user
 */
const userSchema = new mongoose.Schema(
  {
    /** The full name of the user */
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minLength: [2, 'Name must be at least 2 characters long'],
      maxLength: [50, 'Name cannot exceed 50 characters'],
    },
    /** The unique email address of the user */
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Email must be a valid email address',
      ],
    },
    /** The hashed password of the user */
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [6, 'Password must be at least 6 characters long'],
      select: false,
    },
    /** The role of the user (admin or user) */
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: '{VALUE} is not a valid role',
      },
      default: 'user',
    },
    /** Flag indicating if the user account is active */
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to hash the password
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    // Generate a salt with 10 rounds
    const salt = await bcrypt.genSalt(10);
    // Hash the password along with our new salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Override toJSON to remove the password field from outputs
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

const User = mongoose.model('User', userSchema);

export { userSchema, User };
export default User;
