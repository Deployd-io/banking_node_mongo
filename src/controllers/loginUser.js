const logger = require('../utils/logger');
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const Account = require("../models/accountModel");
const tokenGen = require("../utils/tokenGen");
async function authController(body) {
logger.info(`>>> Entering authController(body=${body})`, { "event.action": "authController", "logrite.body": body });
  const userData = _.pick(body, ["email", "password"]);

logger.debug(`authController(body=${body}): userData → ${userData}`, { "event.action": "authController", "logrite.body": body });
const __log_start = Date.now();

  let user = await User.findOne({ email: userData.email }).select('-createdAt -updatedAt -deleteAccount')

logger.debug(`authController(body=${body}): user → ${user}`, { "event.action": "authController", "logrite.body": body });
logger.debug(`authController(body)=${body}: find operation took ${Date.now() - __log_start} ms`, { "event.action": "authController", "event.category": "database", "logrite.body": body });
  if (!user) {
    console.log("User not found");
    return "User not found";
  }

  //get the associated user account
  const id = user._id;
logger.debug(`authController(body=${body}): id → ${id}`, { "event.action": "authController", "logrite.body": body });
  const accountDetails = await Account.findOne({ owner: id }).select("-createdAt -updatedAt -timestamps");
logger.debug(`authController(body=${body}): accountDetails → ${accountDetails}`, { "event.action": "authController", "logrite.body": body });

  const decodedPassword = await bcrypt.compare(userData.password, user.password);

  if (!decodedPassword) {
    console.log("Password mismatch");
    return null;
  }

  const token = tokenGen(
    _.pick(user, ["name", "email", "gender", "dateOfBirth", "address", "_id"]),
    // @ts-ignore
    process.env.secretKey,
    "20min"
  );

  console.log("Authentication successful");
logger.info(`<<< Exiting authController(body=${body})`, { "event.action": "authController", "logrite.body": body });
  return { user, token, accountDetails };
}

module.exports = authController;
