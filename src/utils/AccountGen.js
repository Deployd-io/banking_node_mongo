const logger = require('./logger');
module.exports.AccountGen = () => {
logger.debug('>>> Entering AccountGen()', { "event.action": "AccountGen" });
  const numPool = "1234567890";

logger.debug(`AccountGen(): numPool → ${numPool}`, { "event.action": "AccountGen" });
  let accountNumber = "";
logger.debug(`AccountGen(): accountNumber → ${accountNumber}`, { "event.action": "AccountGen" });

  for (let i = 0; i <= numPool.length; i++) {
    accountNumber += [Math.floor(Math.random() * 10)];
  }

logger.debug('<<< Exiting AccountGen()', { "event.action": "AccountGen" });
  return accountNumber;
};
