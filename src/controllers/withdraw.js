const logger = require('../utils/logger');
module.exports = async function (body, req, res) {
logger.info(`>>> Entering moduleExport(body=${body},req=${req},res=${res})`, { "event.action": "moduleExport", "logrite.body": body, "logrite.req": req, "logrite.res": res });
  const Account = require("../models/accountModel");

logger.debug(`moduleExport(body=${body},req=${req},res=${res}): Account → ${Account}`, { "event.action": "moduleExport", "logrite.body": body, "logrite.req": req, "logrite.res": res });
  const { accountNumber, amount } = body;
  const userId = req.user._id;
logger.debug(`moduleExport(body=${body},req=${req},res=${res}): userId → ${userId}`, { "event.action": "moduleExport", "logrite.body": body, "logrite.req": req, "logrite.res": res });
const __log_start = Date.now();

  const account = await Account.findOne({ owner: userId });
logger.debug(`moduleExport(body=${body},req=${req},res=${res}): account → ${account}`, { "event.action": "moduleExport", "logrite.body": body, "logrite.req": req, "logrite.res": res });
  if (!account) return res.status(404).send("no such an account");
logger.debug(`moduleExport(body,req,res)=${body},${req},${res}: find operation took ${Date.now() - __log_start} ms`, { "event.action": "moduleExport", "event.category": "database", "logrite.body": body, "logrite.req": req, "logrite.res": res });

  if (account.accountNumber !== accountNumber) {
    return res.status(400).send("Invalid account number");
  }
  if (account.balance < amount) {
    return res.status(400).send("Insufficient balance");
  }

  account.balance -= amount;
  await account.save();

logger.info(`<<< Exiting moduleExport(body=${body},req=${req},res=${res})`, { "event.action": "moduleExport", "logrite.body": body, "logrite.req": req, "logrite.res": res });
  return account;
};
