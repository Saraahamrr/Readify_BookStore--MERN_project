const express = require('express');
require('dotenv').config({ path: "../.env" }); 
const nodemailer = require('nodemailer');
// console.log(process.env.MAIL_HOST);
// console.log(process.env.MAIL_PORT);
// console.log(process.env.MAIL_USER);
// console.log(process.env.MAIL_PASS);

var transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    }
});

const sendEmail = async (recipients , subject , message) => {
   return await transporter.sendMail(
    {
        from: process.env.SENDER_EMAIL,
        name: "Readify",
        to: recipients,
        subject : subject,
        text: message,
    });
}

module.exports = {sendEmail};
