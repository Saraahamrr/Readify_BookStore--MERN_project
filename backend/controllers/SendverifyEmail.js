const express = require('express');
const { sendEmail } = require('../config/nodemailer');
const User = require('../models/user');
const user = require('../models/user');

const SendverifyEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        const username = user.username;
        if (!email) {
            return res.status(400).json({ status: "error", msg: "Email is required" });
        }
        if (user.status === "verified") {
            return res.status(400).json({ status: "error", msg: "Email is already verified" });
        }
        const otp = String(Math.floor(Math.random()*900000+100000));
        user.verifyOtp = otp;
        user.verifyOtpExpires = Date.now() + 24*60*60*1000;
        await user.save();

        const recipients = email;
        const subject = `Welcome ${username} to Readifyl`;
        const message = `Please Verify Your Email
        Your OTP is ${otp}`;
        await sendEmail(recipients, subject, message);
        res.status(200).json({ status: "success", msg: "User signed-up successfully,please Verify Your email" });
    } catch (error) {
        res.status(500).json({ status: "error", msg: error.msg });
    }
}

module.exports = { SendverifyEmail };