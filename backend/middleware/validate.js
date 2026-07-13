import { validationResult } from 'express-validator';

/**
 * Middleware to run express-validator checks and collect errors
 */
export const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    
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

    next();
  };
};
