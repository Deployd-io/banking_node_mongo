const logger = require('../utils/logger');
const jwt = require("jsonwebtoken");
const config = require("config");
const joi = require("joi");
module.exports = (req, res, next) => {
logger.debug(`>>> Entering moduleExport(req=${req},res=${res},next=${next})`, { "event.action": "moduleExport" });
  try {
    if (validateLoginData(req.body).error) {
	logger.debug(`<<< Exiting moduleExport(req=${req},res=${res},next=${next})`, { "event.action": "moduleExport" });
      return res.status(400).json({ message: "Invalid data" });
    }
    next();
  } catch (error) {
    next(error);
    console.error(error);
  }
};

function validateLoginData(body) {
logger.debug(`>>> Entering validateLoginData(body=${body})`, { "event.action": "validateLoginData" });
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
  });

logger.debug(`<<< Exiting validateLoginData(body=${body})`, { "event.action": "validateLoginData" });
  return schema.validate(body);
}
