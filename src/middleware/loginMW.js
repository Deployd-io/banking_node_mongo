const logger = require('../utils/logger');
const jwt = require("jsonwebtoken");
const config = require("config");
const joi = require("joi");
module.exports = (req, res, next) => {
logger.info(`>>> Entering moduleExport(req=${req},res=${res},next=${next})`);
  try {
    if (validateLoginData(req.body).error) {
	logger.info(`<<< Exiting moduleExport(req=${req},res=${res},next=${next})`);
      return res.status(400).json({ message: "Invalid data" });
    }
    next();
  } catch (error) {
    next(error);
    console.error(error);
  }
};

function validateLoginData(body) {
logger.info(`>>> Entering validateLoginData(body=${body})`);
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
  });

logger.info(`<<< Exiting validateLoginData(body=${body})`);
  return schema.validate(body);
}
