const logger = require('../utils/logger');
const jwt = require("jsonwebtoken");
module.exports = function authorisationMW(req, res, next) {
logger.debug(`>>> Entering authorisationMW(req=${req},res=${res},next=${next})`);
  try {
    const token = req.header("x-auth-token");

    if (!token) return res.status(401).send("unauthorised,provide access token");

    const validToken = jwt.verify(token, process.env.secretKey);

    if (!validToken) return res.status(401).send("invalid token");
	logger.debug(`<<< Exiting authorisationMW(req=${req},res=${res},next=${next})`);
    req.user = jwt.decode(token);
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};
