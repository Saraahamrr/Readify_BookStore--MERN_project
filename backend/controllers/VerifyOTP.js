const express = require('express');
const User = require('../models/user');
const { authToken } = require('../middleWare/userAuth');


const VerifyOtp = async (req, res) => {

    const { id, otp } = req.body;


    if (!otp ) {
        return res.status(400).json({ status: "error", msg: "otp is required" });
    }
    if (!id) {
        return res.status(400).json({ status: "error", msg: "id is required" });
    }
    try {

    const user = await User.findById(id);
    if (!user) {
        return res.status(400).json({ status: "error", msg: "user not found" });
    }
    // user.verifyOtp = otp;
    // user.save();
    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
        return res.status(400).json({ status: "error", msg: "Invalid OTP" });       

    }
    if (user.verifyOtpExpires < Date.now()) {
        return res.status(400).json({ status: "error", msg: "OTP expired" });
    }
    user.status = "authorized";
    user.verifyOtp = "";
    user.verifyOtpExpires = Date.now();
    await user.save();
    res.status(200).json({ status: "success", msg: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ status: "error", msg: error.msg });
    }
}

module.exports = { VerifyOtp };