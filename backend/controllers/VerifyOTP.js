const express = require('express');
const User = require('../models/user');


const VerifyOtp = async (req, res) => {
    const { id, otp } = req.body;

    if (!otp ) {
        return res.status(400).json({ status: "error", message: "otp is required" });
    }
    if (!id) {
        return res.status(400).json({ status: "error", message: "id is required" });
    }
    try {

    const user = await User.findById(id);
    if (!user) {
        return res.status(400).json({ status: "error", message: "user not found" });
    }
    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
        return res.status(400).json({ status: "error", message: "Invalid OTP" });       

    }
    if (user.verifyOtpExpires < Date.now()) {
        return res.status(400).json({ status: "error", message: "OTP expired" });
    }
    user.status = "authorized";
    user.verifyOtp = "";
    user.verifyOtpExpires = Date.now();
    await user.save();
    res.status(200).json({ status: "success", message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}

module.exports = { VerifyOtp };