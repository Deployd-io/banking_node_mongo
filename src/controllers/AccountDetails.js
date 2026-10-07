const logger = require('../utils/logger');
// @ts-nocheck
const Account = require("../models/accountModel");
const _ = require("lodash");

/**
 * Retrieves the account details for the specified owner ID.
 *
 * @param {string} owner_id - The ID of the account owner.
 * @returns {Object|null} - The account details object, or null if the account is not found.
 */
module.exports.getUserAccountDetails = async (owner_id) => {
logger.info(`>>> Entering getUserAccountDetails(owner_id=${owner_id})`); const __log_start = Date.now();
  let account = await Account.findOne({ owner: owner_id });
  if (!account) return null;

logger.debug(`getUserAccountDetails(owner_id=${owner_id}): account → ${account}`, { "event.action": "getUserAccountDetails", "logrite.owner_id": owner_id });
  const Acctdetails = _.pick(account, [
    "accountType",
    "currency",
    "balance",
    "accountNumber",
  ]);

logger.info(`<<< Exiting getUserAccountDetails(owner_id=${owner_id})`, { "event.action": "getUserAccountDetails", "logrite.owner_id": owner_id });
  return Acctdetails;
};
