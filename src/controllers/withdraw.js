const logger = require('../utils/logger');
module.exports = async function (body, req, res) {
logger.info(`>>> Entering moduleExport(body=${body},req=${req},res=${res})`);
  const Account = require("../models/accountModel");

logger.info(`moduleExport(body=${body},req=${req},res=${res}): Account → ${Account}`);
  const { accountNumber, amount } = body;
  const userId = req.user._id;
logger.info(`moduleExport(body=${body},req=${req},res=${res}): userId → ${userId}`);
const __log_start = Date.now();

  const account = await Account.findOne({ owner: userId });
logger.info(`moduleExport(body=${body},req=${req},res=${res}): account → ${account}`);
logger.info(`moduleExport(body,req,res)=${body},${req},${res}: find operation took ${Date.now() - __log_start} ms`);
  if (!account) return res.status(404).send("no such an account");

  if (account.accountNumber !== accountNumber) {
    return res.status(400).send("Invalid account number");
  }
  if (account.balance < amount) {
    return res.status(400).send("Insufficient balance");
  }

  account.balance -= amount;
  await account.save();

logger.info(`<<< Exiting moduleExport(body=${body},req=${req},res=${res})`);
  return account;
};
