const jwt = require('jsonwebtoken');
require('dotenv').config();

const authToken = (req, res, next) => {
    // const {authHeaders} = req.headers('auth-token'); 
    // const token = authHeaders.split(' ')[1];
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
        return res.status(401).json({ msg: 'Access Denied, Token Required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.id) {
            return res.status(403).json({ msg: 'Unauthorized, please log in again' });
        }
        req.body.id = decoded.id; 

        next(); 
    } catch (err) {
        return res.status(403).json({ msg: 'Invalid Token' });
    }
};

module.exports = { authToken };
