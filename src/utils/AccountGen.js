const logger = require('./logger');
module.exports.AccountGen = () => {
logger.info('>>> Entering AccountGen()');
  const numPool = "1234567890";

logger.info(`AccountGen(): numPool → ${numPool}`);
  let accountNumber = "";
logger.info(`AccountGen(): accountNumber → ${accountNumber}`);

  for (let i = 0; i <= numPool.length; i++) {
    accountNumber += [Math.floor(Math.random() * 10)];
  }

logger.info('<<< Exiting AccountGen()');
  return accountNumber;
};
