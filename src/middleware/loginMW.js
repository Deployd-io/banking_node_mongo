const logger = require('../utils/logger');
const jwt = require("jsonwebtoken");
const config = require("config");
const joi = require("joi");
module.exports = (req, res, next) => {
logger.debug(`>>> Entering moduleExport(req=****,res=${res},next=${next})`);
  try {
    if (validateLoginData(req.body).error) {
	logger.debug(`<<< Exiting moduleExport(req=****,res=${res},next=${next})`);
      return res.status(400).json({ message: "Invalid data" });
    }
    next();
  } catch (error) {
    next(error);
    console.error(error);
  }
};

function validateLoginData(body) {
logger.debug(`>>> Entering validateLoginData(body=****)`);
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
  });

logger.debug(`<<< Exiting validateLoginData(body=****)`);
  return schema.validate(body);
}
