const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const OTPModel = require("../models/otpModel"); // Create an OTP model if needed
const dotenv = require("dotenv");

dotenv.config();

// Setup transporter (Replace with your email credentials)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

router.post("/send-otp", async (req, res) => {
  const { email, orderDetails, totalPrice } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP

  // Store OTP in the database (optional)
  await OTPModel.create({ email, otp, createdAt: new Date() });

  // Email message
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Order Confirmation & OTP",
    text: `Your OTP is: ${otp}\nOrder Details:\n${JSON.stringify(orderDetails, null, 2)}\nTotal Price: ${totalPrice} EGP`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "OTP sent successfully", otp });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const validOtp = await OTP.findOne({ userEmail: email, otp });

    if (!validOtp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // OTP is valid, delete it after verification
    await OTP.deleteOne({ _id: validOtp._id });

    res.json({ message: "OTP verified successfully!" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Error verifying OTP" });
  }
});



module.exports = router;


