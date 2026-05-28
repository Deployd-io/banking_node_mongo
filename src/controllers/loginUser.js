import logger from "../utils/logger.js";
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const Account = require("../models/accountModel");
const tokenGen = require("../utils/tokenGen");
async function authController(body) {
logger.debug(`>>> Entering authController(body=${body})`);
  const userData = _.pick(body, ["email", "password"]);

logger.debug(`authController(body=${body}): userData → ${userData}`);

  let user = await User.findOne({ email: userData.email }).select('-createdAt -updatedAt -deleteAccount')

logger.debug(`authController(body=${body}): user → ${user}`);
  if (!user) {
    console.log("User not found");
    return "User not found";
  }

  //get the associated user account
  const id = user._id;
logger.debug(`authController(body=${body}): id → ${id}`);
  const accountDetails = await Account.findOne({ owner: id }).select("-createdAt -updatedAt -timestamps");
logger.debug(`authController(body=${body}): accountDetails → ${accountDetails}`);

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
logger.debug(`<<< Exiting authController(body=${body})`);
  return { user, token, accountDetails };
}

module.exports = authController;
