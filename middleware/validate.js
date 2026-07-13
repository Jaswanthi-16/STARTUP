import { validationResult } from 'express-validator';

/**
 * Middleware to run express-validator checks and collect errors
 * @param {Array} validations - Array of express-validator validation chains
 */
export const validate = (validations) => {
  return async (req, res, next) => {
    // Runs express-validator checks
    await Promise.all(validations.map((validation) => validation.run(req)));

    // Collects errors
    const errors = validationResult(req);
    
    // If errors exist: return 400
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      }));
      
      return res.status(400).json({
        success: false,
        message: formattedErrors.map(e => e.message).join(', '),
        errors: formattedErrors,
      });
    }

    // If no errors: calls next()
    next();
  };
};
