const logger = require('../utils/logger');
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");


module.exports = async function check_otpValidity ( req, res, next ) {
logger.info(`>>> Entering check_otpValidity(req=${req},res=${res},next=${next})`); const __log_start = Date.now();
  try {
    const user = await User.findOne({ email: req.body.email });
	logger.info(`check_otpValidity(req=${req},res=${res},next=${next}): user.otpCert → ${user.otpCert}`);

    if (!user) return res.status(400).send("invalid email");
	logger.info(`check_otpValidity(req=${req},res=${res},next=${next}): user → ${user}`);

    if (!user?.otpCert)
      return res.status(401).send(" you are not authorised. go for authorisation");

    const Cert = user?.otpCert;

    let validOtpCert = jwt.verify(Cert, process.env.secretKey);

    if (!validOtpCert) return res.status(400).send("invalid otpCert");
	logger.info(`<<< Exiting check_otpValidity(req=${req},res=${res},next=${next})`);

    user.otpCert = null;
    await user.save();

    next();
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};
