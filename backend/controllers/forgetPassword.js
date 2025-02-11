const express = require('express');
const User = require('../models/user');
const { sendEmail } = require('../config/nodemailer');
const bcrypt = require("bcryptjs");

const forgetPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ status: "error", msg: "Email is required" });
    }
    try {

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ status: "error", msg: "user not found" });
    }
    const username = user.username;
    const otp = String(Math.floor(Math.random()*900000+100000));
    user.resetOTP = otp;
    user.resetOTPExpires = Date.now() + 24*60*60*1000;
    await user.save();

    const recipients = email;
    const subject = `Password Reset OTP`;
    const msg = `Hello ${username}!
    Please Enter the OTP to reset your password,
    This is your OTP : ${otp}`;
    await sendEmail(recipients , subject , msg);
    res.status(200).json({ status: "success", msg: "OTP sent to your email to reset your password" });
}
    catch (error) {
        res.status(500).json({ status: "error", msg: error.msg });
    }

};

const resetPassword = async (req, res) => {
    const { email, otp, password } = req.body;

    if (!otp ) {
        return res.status(400).json({ status: "error", msg: "OTPp is required" });
    }
    if (!email) {
        return res.status(400).json({ status: "error", msg: "OTP expired , Try again" });
    }
    if (!password) {
        return res.status(400).json({ status: "error", msg: "password is required" });
    }
    try {

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ status: "error", msg: "user not found" });
    }                   
    if (user.resetOTP === "" || user.resetOTP !== otp) {
        return res.status(400).json({ status: "error", msg: "Invalid OTP" });       

    }
    if (user.resetOTPExpires < Date.now()) {
        return res.status(400).json({ status: "error", msg: "OTP expired" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetOTP = "";
    user.resetOTPExpires = Date.now();
    await user.save();
    res.status(200).json({ status: "success", msg: "Password reset successfully" });
    }
    catch (error) {
        res.status(500).json({ status: "error", msg: error.msg });
    }
}


module.exports = { forgetPassword, resetPassword };

