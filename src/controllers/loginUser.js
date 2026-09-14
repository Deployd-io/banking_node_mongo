const logger = require('../utils/logger');
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const Account = require("../models/accountModel");
const tokenGen = require("../utils/tokenGen");
async function authController(body) {
logger.info(`>>> Entering authController(body=${body})`);
  const userData = _.pick(body, ["email", "password"]);

logger.info(`authController(body=${body}): userData → ${userData}`);
const __log_start = Date.now();

  let user = await User.findOne({ email: userData.email }).select('-createdAt -updatedAt -deleteAccount')

logger.info(`authController(body=${body}): user → ${user}`);
logger.info(`authController(body)=${body}: find operation took ${Date.now() - __log_start} ms`);
  if (!user) {
    console.log("User not found");
    return "User not found";
  }

  //get the associated user account
  const id = user._id;
logger.info(`authController(body=${body}): id → ${id}`);
  const accountDetails = await Account.findOne({ owner: id }).select("-createdAt -updatedAt -timestamps");
logger.info(`authController(body=${body}): accountDetails → ${accountDetails}`);

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
logger.info(`<<< Exiting authController(body=${body})`);
  return { user, token, accountDetails };
}

module.exports = authController;
