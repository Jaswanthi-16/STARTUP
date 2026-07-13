import express from 'express';
import { check } from 'express-validator';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
  getLeads,
  createLead,
  getLeadById,
  updateLead,
  updateLeadStatus,
  deleteLead,
  getLeadStats,
  getMonthlyStats,
  searchLeads
} from '../controllers/leadController.js';

const router = express.Router();

// Apply protect middleware to ALL routes in this file
// Ensures req.user is populated for all subsequent routes
router.use(protect);

const validStatuses = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];
const validSources = ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Other'];

// Validation rules for creating/updating a lead
const leadValidation = [
  check('name', 'Name is required and must be at least 2 characters')
    .notEmpty()
    .isLength({ min: 2 }),
  check('company', 'Company is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail().normalizeEmail(),
  check('status', 'Invalid status value').optional().isIn(validStatuses),
  check('source', 'Invalid source value').optional().isIn(validSources),
];

// Validation for updating status only
const statusValidation = [
  check('status', 'Invalid status value').notEmpty().isIn(validStatuses),
];

// ==========================================
// Routes
// ==========================================

// NOTE: Specific routes (like /stats) must be defined BEFORE 
// parameterized routes (like /:id) so Express doesn't interpret 'stats' as an ID.

router.get('/stats/summary', getLeadStats);
router.get('/stats/monthly', getMonthlyStats);
router.get('/search', searchLeads);

router.route('/')
  .get(getLeads)
  .post(validate(leadValidation), createLead);

router.route('/:id')
  .get(getLeadById)
  .put(validate(leadValidation), updateLead)
  .delete(deleteLead);

router.patch('/:id/status', validate(statusValidation), updateLeadStatus);

export default router;
