const logger = require('../utils/logger');
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const Account = require("../models/accountModel");
const tokenGen = require("../utils/tokenGen");
async function authController(body) {
logger.debug(`>>> Entering authController(body=****)`);
  const userData = _.pick(body, ["email", "password"]);

logger.debug(`authController(body=****): userData → ****`);

  let user = await User.findOne({ email: userData.email }).select('-createdAt -updatedAt -deleteAccount')

logger.debug(`authController(body=****): user → ****`);
  if (!user) {
    console.log("User not found");
    return "User not found";
  }

  //get the associated user account
  const id = user._id;
logger.debug(`authController(body=****): id → ${id}`);
logger.debug(`authController(body=****): accountDetails → ****`);
  const accountDetails = await Account.findOne({ owner: id }).select("-createdAt -updatedAt -timestamps");

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
logger.debug(`<<< Exiting authController(body=****)`);
  return { user, token, accountDetails };
}

module.exports = authController;
