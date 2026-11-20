const logger = require('./logger');
const Transaction = require("../models/transactionModel");
module.exports = async function logTransaction(
  sender,
  recipient,
  amount,
  type,
  status,
  description
) {
logger.debug(`>>> Entering logTransaction(sender=${sender},recipient=${recipient},amount=${amount},type=${type},status=${status},description=${description})`, { "event.action": "logTransaction", "logrite.sender": sender, "logrite.recipient": recipient, "logrite.amount": amount, "logrite.type": type, "logrite.status": status, "logrite.description": description });
  const transaction = new Transaction({
    senderAccount: sender,
    amount: amount,
    recipientAccount: recipient,
    transactionType: type,
    status: status,
    description: description ? description : "",
    
  });
const __log_start = Date.now();
  await transaction.save();
logger.debug(`logTransaction(sender=${sender},recipient=${recipient},amount=${amount},type=${type},status=${status},description=${description}): transaction → ${transaction}`, { "event.action": "logTransaction", "logrite.sender": sender, "logrite.recipient": recipient, "logrite.amount": amount, "logrite.type": type, "logrite.status": status, "logrite.description": description });
logger.info(`logTransaction(sender,recipient,amount,type,status,description)=${sender},${recipient},${amount},${type},${status},${description}: save operation took ${Date.now() - __log_start} ms`, { "event.action": "logTransaction", "event.category": "database", "logrite.sender": sender, "logrite.recipient": recipient, "logrite.amount": amount, "logrite.type": type, "logrite.status": status, "logrite.description": description });
};
