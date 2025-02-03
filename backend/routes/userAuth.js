// why this file: This file is used to verify the token and check if the user is authenticated or not
// what it does: It verifies the token and checks if the user is authenticated or not
// what it contains: It contains a function authToken which verifies the token and checks if the user is authenticated or not
// Require it in: Require it in the routes where you want to check if the user is authenticated or not
// Exports: It exports the authToken function                                               
// Exported to: It is exported to the routes where you want to check if the user is authenticated or not
// How to use: Import the file in the routes where you want to check if the user is authenticated or not and use the authToken function

//req , res , next ====> what is next here
//jwt.verify(token, "bookstore123", (err, user) => { ====> what is this line doing
//req.user = user; ====> what is this line doing
//next(); ====> what is this line doing
// what is header('auth-token') ====> what is this line doing
// what is authHeader && authHeader.split(' ')[1] ====> what is this line doing


const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
    const authHeader = req.header('auth-token');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send('Access Denied');
    };

    jwt.verify(token, "bookstore123", (err, user) => {
        if (err) {
            return res.status(403).send('Invalid Token')
        };
        req.user = user;
        next();
    });
}

module.exports = {authToken};