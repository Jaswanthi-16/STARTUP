import Lead from '../models/Lead.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

/**
 * Get all leads for the authenticated user with pagination, sorting, and dynamic filtering.
 */
export const getLeads = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      status,
      search,
      source,
      dateFrom,
      dateTo
    } = req.query;

    const filter = { owner: req.user._id };

    if (status && status !== 'All') {
      filter.status = status;
    }

    if (source && source !== 'All') {
      filter.source = source;
    }

    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
      if (dateTo) filter.createdAt.$lte = new Date(dateTo);
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 20;
    const skip = (pageNumber - 1) * limitNumber;

    const leads = await Lead.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNumber);

    const total = await Lead.countDocuments(filter);
    const pages = Math.ceil(total / limitNumber);

    return successResponse(res, {
      leads,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        pages,
        hasNext: skip + limitNumber < total,
        hasPrev: pageNumber > 1,
      }
    }, 'Leads retrieved successfully', 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new lead for the authenticated user.
 */
export const createLead = async (req, res, next) => {
  try {
    const leadData = {
      ...req.body,
      owner: req.user._id,
    };

    const newLead = await Lead.create(leadData);

    return successResponse(res, newLead, 'Lead created successfully', 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a specific lead by ID.
 */
export const getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findOne({ _id: req.params.id, owner: req.user._id });

    if (!lead) {
      return errorResponse(res, 'Lead not found', 404);
    }

    return successResponse(res, lead, 'Lead retrieved successfully', 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Update a lead by ID.
 */
export const updateLead = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    delete updates.owner;

    const lead = await Lead.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      updates,
      { new: true, runValidators: true }
    );

    if (!lead) {
      return errorResponse(res, 'Lead not found', 404);
    }

    return successResponse(res, lead, 'Lead updated successfully', 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Update the status of a lead by ID.
 */
export const updateLeadStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const lead = await Lead.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return errorResponse(res, 'Lead not found', 404);
    }

    return successResponse(res, lead, 'Lead status updated successfully', 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a lead by ID.
 */
export const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findOne({ _id: req.params.id, owner: req.user._id });

    if (!lead) {
      return errorResponse(res, 'Lead not found', 404);
    }

    await lead.deleteOne();

    return successResponse(res, null, 'Lead deleted successfully', 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Get lead statistics using aggregation pipeline.
 */
export const getLeadStats = async (req, res, next) => {
  try {
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

    const stats = await Lead.aggregate([
      { $match: { owner: req.user._id } },
      {
        $facet: {
          totalBreakdown: [
            { $group: { _id: null, total: { $sum: 1 }, won: { $sum: { $cond: [{ $eq: ['$status', 'Won'] }, 1, 0] } } } }
          ],
          statusBreakdown: [
            { $group: { _id: '$status', count: { $sum: 1 } } }
          ],
          sourceBreakdown: [
            { $group: { _id: '$source', count: { $sum: 1 } } }
          ],
          thisMonthLeads: [
            { $match: { createdAt: { $gte: currentMonthStart } } },
            { $count: 'count' }
          ],
          lastMonthLeads: [
            { $match: { createdAt: { $gte: previousMonthStart, $lte: previousMonthEnd } } },
            { $count: 'count' }
          ]
        }
      }
    ]);

    const result = stats[0];
    const totalLeads = result.totalBreakdown[0]?.total || 0;
    const wonLeads = result.totalBreakdown[0]?.won || 0;
    const conversionRate = totalLeads > 0 ? Number(((wonLeads / totalLeads) * 100).toFixed(1)) : 0;

    const statusBreakdown = {};
    result.statusBreakdown.forEach(s => { statusBreakdown[s._id] = s.count; });

    const sourceBreakdown = {};
    result.sourceBreakdown.forEach(s => { sourceBreakdown[s._id] = s.count; });

    const thisMonthLeads = result.thisMonthLeads[0]?.count || 0;
    const lastMonthLeads = result.lastMonthLeads[0]?.count || 0;

    const growthRate = lastMonthLeads > 0
      ? Number((((thisMonthLeads - lastMonthLeads) / lastMonthLeads) * 100).toFixed(1))
      : (thisMonthLeads > 0 ? 100 : 0);

    const statsObject = {
      totalLeads,
      statusBreakdown,
      conversionRate,
      sourceBreakdown,
      thisMonthLeads,
      lastMonthLeads,
      growthRate
    };

    return successResponse(res, statsObject, 'Lead stats retrieved successfully', 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Get monthly stats for the last 6 months.
 */
export const getMonthlyStats = async (req, res, next) => {
  try {
    const monthsArray = [];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      monthsArray.push({
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        name: d.toLocaleString('en-US', { month: 'short' }) + ' ' + d.getFullYear(),
        total: 0,
        won: 0,
        lost: 0
      });
    }

    const sixMonthsAgoStart = new Date(monthsArray[0].year, monthsArray[0].month - 1, 1);

    const monthlyStats = await Lead.aggregate([
      {
        $match: {
          owner: req.user._id,
          createdAt: { $gte: sixMonthsAgoStart }
        }
      },
      {
        $group: {
          _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
          total: { $sum: 1 },
          won: { $sum: { $cond: [{ $eq: ['$status', 'Won'] }, 1, 0] } },
          lost: { $sum: { $cond: [{ $eq: ['$status', 'Lost'] }, 1, 0] } }
        }
      }
    ]);

    monthlyStats.forEach(stat => {
      const monthObj = monthsArray.find(m => m.year === stat._id.year && m.month === stat._id.month);
      if (monthObj) {
        monthObj.total = stat.total;
        monthObj.won = stat.won;
        monthObj.lost = stat.lost;
      }
    });

    const formattedStats = monthsArray.map(m => ({
      month: m.name,
      total: m.total,
      won: m.won,
      lost: m.lost,
      conversionRate: m.total > 0 ? Number(((m.won / m.total) * 100).toFixed(1)) : 0
    }));

    return successResponse(res, formattedStats, 'Monthly stats retrieved successfully', 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Quick search for leads by name, company, or email
 */
export const searchLeads = async (req, res, next) => {
  try {
    const { q, limit = 5 } = req.query;
    if (!q) {
      return successResponse(res, [], 'Search query empty', 200);
    }
    const regex = new RegExp(q, 'i');

    const leads = await Lead.find(
      {
        owner: req.user._id,
        $or: [{ name: regex }, { company: regex }, { email: regex }]
      },
      '_id name company email status'
    ).limit(Number(limit));

    return successResponse(res, leads, 'Search successful', 200);
  } catch (error) {
    next(error);
  }
};
