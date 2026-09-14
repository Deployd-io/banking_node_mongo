const logger = require('../utils/logger');
module.exports = function ErrorMW(err, req, res, next) {
logger.info(`>>> Entering ErrorMW(err=${err},req=${req},res=${res},next=${next})`);
  // Log the error message and stack trace for debugging
  console.error("Error Message: ", err.message);
  console.error("Error Stack: ", err.stack);

logger.info(`<<< Exiting ErrorMW(err=${err},req=${req},res=${res},next=${next})`);
  // Send a detailed response to the client
  res.status(500).send({
    errorMessage: err.message,
  });
};
