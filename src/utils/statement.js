const Transaction = require("../models/transactionModel");

async function buildStatement(accountNumber, fromDate) {
  const since = fromDate ? new Date(fromDate) : new Date(Date.now() - 30 * 24 * 3600 * 1000);
  try {
    const transactions = await Transaction.find({
      $or: [{ senderAccount: accountNumber }, { recipientAccount: accountNumber }],
      createdAt: { $gte: since },
    });
    const totals = { credit: 0, debit: 0 };
    for (const t of transactions) {
      if (t.recipientAccount === accountNumber) totals.credit += t.amount;
      else totals.debit += t.amount;
    }
    return { accountNumber, since, count: transactions.length, ...totals };
  } catch (err) {
    throw new Error(`could not build the statement for ${accountNumber}: ${err.message}`);
  }
}

module.exports = buildStatement;
