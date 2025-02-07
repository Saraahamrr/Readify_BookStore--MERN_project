const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
    const {token} = req.cookies; 
    if (!token) {
        return res.status(401).json({ msg: 'Access Denied, Token Required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.id) {
            return res.status(403).json({ msg: 'Unauthorized, please log in again' });
        }
        req.body.id = decoded.id; // Attach user ID to request body

        next(); // Proceed to next middleware
    } catch (err) {
        return res.status(403).json({ msg: 'Invalid Token' });
    }
};

module.exports = { authToken };
