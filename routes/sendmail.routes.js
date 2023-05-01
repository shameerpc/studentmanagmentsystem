const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Nodemailer = require("../middleware/nodemailer");
require("dotenv").config();

router.post("/", function (req, res) {
  console.log("email heheheh");
  console.log(req.body);
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({ message: "Email address is required" });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // change the SMTP host as needed
    port: 587, // change the SMTP port as needed
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD_GMAIL,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Test Email",
    text: "This is a test email from the admin dashboard",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Failed to send email" });
    } else {
      console.log("Email sent: " + info.response);
      return res.status(200).json({ message: "Email sent successfully" });
    }
  });
});


module.exports = router;
