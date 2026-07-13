import mongoose from 'mongoose';

/**
 * Lead Schema defining the structure for the Lead document
 * @typedef {Object} Lead
 * @property {string} name - The full name of the lead
 * @property {string} company - The company the lead belongs to
 * @property {string} email - The email address of the lead
 * @property {string} [phone] - The phone number of the lead
 * @property {string} status - The current status of the lead in the pipeline
 * @property {string} source - The source from which the lead originated
 * @property {string} [notes] - Additional notes about the lead
 * @property {mongoose.Schema.Types.ObjectId} owner - The user who owns/created this lead
 * @property {Date} createdAt - Timestamp of when the lead was created
 * @property {Date} updatedAt - Timestamp of the last update to the lead
 */
const leadSchema = new mongoose.Schema(
  {
    /** The full name of the lead */
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minLength: [2, 'Name must be at least 2 characters long'],
      maxLength: [100, 'Name cannot exceed 100 characters'],
    },
    /** The company the lead belongs to */
    company: {
      type: String,
      required: [true, 'Company is required'],
      trim: true,
    },
    /** The email address of the lead */
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Email must be a valid email address',
      ],
    },
    /** The phone number of the lead */
    phone: {
      type: String,
      trim: true,
    },
    /** The current status of the lead in the pipeline */
    status: {
      type: String,
      enum: {
        values: ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'],
        message: '{VALUE} is not a valid status',
      },
      default: 'New',
    },
    /** The source from which the lead originated */
    source: {
      type: String,
      enum: {
        values: ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Other'],
        message: '{VALUE} is not a valid source',
      },
      default: 'Website',
    },
    /** Additional notes about the lead */
    notes: {
      type: String,
      maxLength: [1000, 'Notes cannot exceed 1000 characters'],
    },
    /** The user who owns/created this lead */
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Owner is required to link the lead to a user'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual field for age (number of days since the lead was created)
leadSchema.virtual('age').get(function () {
  if (!this.createdAt) return 0;
  const now = new Date();
  const diffTime = Math.abs(now - this.createdAt);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Indexes for optimization
leadSchema.index({ owner: 1, status: 1 });
leadSchema.index({ email: 1 });
leadSchema.index({ owner: 1, createdAt: -1 }); // For date range and monthly aggregations
leadSchema.index({ owner: 1, source: 1 }); // For source filtering

const Lead = mongoose.model('Lead', leadSchema);

export { leadSchema, Lead };
export default Lead;
