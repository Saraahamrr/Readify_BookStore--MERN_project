const express = require('express');
const User = require('../models/user');
const { sendEmail } = require('../config/nodemailer');
const bcrypt = require("bcryptjs");

const forgetPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ status: "error", message: "Email is required" });
    }
    try {

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ status: "error", message: "user not found" });
    }
    const username = user.username;
    const otp = String(Math.floor(Math.random()*900000+100000));
    user.resetOTP = otp;
    user.resetOTPExpires = Date.now() + 24*60*60*1000;
    await user.save();

    const recipients = email;
    const subject = `Password Reset OTP`;
    const message = `Hello ${username}!
    Please Enter the OTP to reset your password,
    This is your OTP : ${otp}`;
    await sendEmail(recipients , subject , message);
    res.status(200).json({ status: "success", message: "OTP sent to your email to reset your password" });
}
    catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }

};

const resetPassword = async (req, res) => {
    const { id, otp, password } = req.body;

    if (!otp ) {
        return res.status(400).json({ status: "error", message: "otp is required" });
    }
    if (!id) {
        return res.status(400).json({ status: "error", message: "id is required" });
    }
    if (!password) {
        return res.status(400).json({ status: "error", message: "password is required" });
    }
    try {

    const user = await User.findById(id);
    if (!user) {
        return res.status(400).json({ status: "error", message: "user not found" });
    }                   
    if (user.resetOTP === "" || user.resetOTP !== otp) {
        return res.status(400).json({ status: "error", message: "Invalid OTP" });       

    }
    if (user.resetOTPExpires < Date.now()) {
        return res.status(400).json({ status: "error", message: "OTP expired" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetOTP = "";
    user.resetOTPExpires = Date.now();
    await user.save();
    res.status(200).json({ status: "success", message: "Password reset successfully" });
    }
    catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}


module.exports = { forgetPassword, resetPassword };

