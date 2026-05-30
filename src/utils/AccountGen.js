const logger = require('./logger');
module.exports.AccountGen = () => {
logger.debug('>>> Entering AccountGen()');
  const numPool = "1234567890";

logger.debug(`AccountGen(): numPool → ${numPool}`);
  let accountNumber = "";

  for (let i = 0; i <= numPool.length; i++) {
    accountNumber += [Math.floor(Math.random() * 10)];
  }

logger.debug('<<< Exiting AccountGen()');
  return accountNumber;
};
