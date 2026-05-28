import logger from "../utils/logger.js";
const jwt = require("jsonwebtoken");
const config = require("config");
const joi = require("joi");
module.exports = (req, res, next) => {
  try {
    if (validateLoginData(req.body).error) {
      return res.status(400).json({ message: "Invalid data" });
    }
    next();
  } catch (error) {
    next(error);
    console.error(error);
  }
};

function validateLoginData(body) {
logger.debug(`>>> Entering validateLoginData(body=${body})`);
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
  });

logger.debug(`<<< Exiting validateLoginData(body=${body})`);
  return schema.validate(body);
}
