const Joi = require("joi");
const logger = require("../utils/logger");
/**
 * Middleware function that validates the registration data in the request body.
 * If the data is valid, it calls the next middleware function. If the data is
 * invalid, it returns a 400 Bad Request response with the error message.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
module.exports = (req, res, next) => {
logger.debug('registerationMW', `>>> Entering moduleExport(req=${req},res=${res},next=${next})`, { "event.action": "moduleExport" });
  logger.info("inside validateRegisterationMW..... ");
  logger.info("attempting to validate user data...");

  const { error } = validateRegistrationData(req.body);

  if (error) {
    next(error);

    logger.error("failed validating user", error);
    // return res.status(400).json({ error: error.details[0].message });
  }

  logger.info("done validating user data...");

  next();
logger.debug('registerationMW', `<<< Exiting moduleExport(req=${req},res=${res},next=${next})`, { "event.action": "moduleExport" });
};

function validateRegistrationData(body) {
logger.debug('registerationMW', `>>> Entering validateRegistrationData(body=${body})`, { "event.action": "validateRegistrationData" });
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    dateOfBirth: Joi.date().required(),
    gender: Joi.string().valid("male", "female", "other").required(),
    phoneNumber: Joi.number().required(),
    address: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      postalCode: Joi.number().required(),
    }).required(),
    role: Joi.string().valid("admin", "user").required(),
  });

logger.debug('registerationMW', `<<< Exiting validateRegistrationData(body=${body})`, { "event.action": "validateRegistrationData" });
  return schema.validate(body);
}
