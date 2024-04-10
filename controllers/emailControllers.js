const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: "myadaramsaikiran@gmail.com",
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = expressAsyncHandler(async (req, res) => {
  const { email, username, name } = req.body;
  console.log(email, username, name);

  var mailOptions = {
    from: "myadaramsaikiran@gmail.com",
    to: email,
    subject: "Welcome to Dribbble!",
    text: `Hello ${name},\n\nThank you for signing up on Dribble. We're excited to have you on board!`,
    html: `<p>Hello ${name},</p><p>Thank you for signing up on Dribble. We're excited to have you on board!</p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully!");
    }
  });
});

module.exports = { sendEmail };
