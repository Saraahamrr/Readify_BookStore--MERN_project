const express = require('express');
const { sendEmail } = require('../config/nodemailer');
const User = require('../models/user');

const ConfirmationEmail = async (req, res) => {
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

        const recipients = email;
        const subject = `ThankYou ${username}`;
        const message = `
        This is your confirmation email
        ThankYou ${username},
        Hope you enjoy your books
        `;
        await sendEmail(recipients , subject , message);
        res.status(200).json({ status: "success", msg: "Confirmation sent to your Email"} );
    } catch (error) {
        res.status(500).json({ status: "error", msg: error });
        console.log(error);
    }
}

module.exports = { ConfirmationEmail };