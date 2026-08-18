const logger = require('../utils/logger');
const transporter = require("./transporter");

module.exports = async function sendEmail(to, subject, message) {
logger.debug(`>>> Entering sendEmail(to=${to},subject=${subject},message=${message})`);
logger.debug(`<<< Exiting sendEmail(to=${to},subject=${subject},message=${message})`);
  return transporter.sendMail({
    sender: "bankMailer@gmail.com",
    from: "tgodmuna@yahoo.com",
    to: to,
    subject: subject,
    html: message,
    priority: "high",
  });
};
