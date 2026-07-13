/**
 * Sends a standardized success response.
 * 
 * @param {Object} res - Express response object
 * @param {any} data - The payload to send
 * @param {string} message - Success message
 * @param {number} [statusCode=200] - HTTP status code
 * @returns {Object} JSON response
 */
export const successResponse = (res, data, message, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Sends a standardized error response.
 * 
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {number} [statusCode=500] - HTTP status code
 * @param {any} [errors=null] - Additional error details (e.g., validation errors)
 * @returns {Object} JSON response
 */
export const errorResponse = (res, message, statusCode = 500, errors = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

/**
 * Sends a standardized paginated response.
 * 
 * @param {Object} res - Express response object
 * @param {Array} data - Array of paginated data
 * @param {number} total - Total number of items
 * @param {number} page - Current page number
 * @param {number} limit - Number of items per page
 * @returns {Object} JSON response
 */
export const paginatedResponse = (res, data, total, page, limit) => {
  return res.status(200).json({
    success: true,
    data,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit),
    },
  });
};
