const logger = require('../utils/logger');
const transporter = require("./transporter");

module.exports = async function sendEmail(to, subject, message) {
logger.info(`>>> Entering sendEmail(to=${to},subject=${subject},message=${message})`);
logger.info(`<<< Exiting sendEmail(to=${to},subject=${subject},message=${message})`);
  return transporter.sendMail({
    sender: "bankMailer@gmail.com",
    from: "tgodmuna@yahoo.com",
    to: to,
    subject: subject,
    html: message,
    priority: "high",
  });
};
