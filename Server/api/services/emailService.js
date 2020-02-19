

const nodemailer = require("nodemailer");

const SendEmail = async options => {
  // 1. Create a transporter with my email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME_GMAIL,
      pass: process.env.EMAIL_PASSWORD_GMAIL
    }
  });

  // 2.mail details
  const mailOption = {
    from: "Mushky <mushmush722@gmail.com>",
    to: options.email,
    subject: options.subject,
    html: options.message
  };

  // 3. Sending the email
  await transporter.sendMail(mailOption);
};
module.exports = SendEmail;