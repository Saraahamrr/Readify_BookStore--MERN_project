const express = require('express');
const { sendEmail } = require('../config/nodemailer');
const User = require('../models/user');
const { SendverifyEmail } = require('../controllers/SendverifyEmail');
const {authToken} = require('../routes/userAuth');


const VerifyEmail = async (req, res) => {
    const { id,otp } = req.body;

    if (!otp) {
        return res.status(400).json({ status: "error", message: "otp is required" });
    }
    if (!id) {
        return res.status(400).json({ status: "error", message: "id is required" });
    }
    try {

    
    const User = await User.findById(id);
    if (!User) {
        return res.status(400).json({ status: "error", message: "User not found" });
    }
    if (User.verifyOtp === "" || User.verifyOtp !== otp) {
        return res.status(400).json({ status: "error", message: "Invalid OTP" });       

    }
    if (User.verifyOtpExpires < Date.now()) {
        return res.status(400).json({ status: "error", message: "OTP expired" });
    }
    User.status = "verified";
    User.verifyOtp = "";
    User.verifyOtpExpires = Date.now();
    await User.save();
    res.status(200).json({ status: "success", message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}

module.exports = { VerifyEmail };