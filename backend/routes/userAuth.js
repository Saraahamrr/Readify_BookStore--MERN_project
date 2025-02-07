const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
    const authHeader = req.cookies || req.headers['auth-token'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send('Access Denied, Token Required');
    };

    try {

    const token_decode = jwt.verify(token, process.env.JWT_SECRET)

        if (token_decode.id){
            console.log(token_decode.id);
            // adding id to req.body from ui
            req.body.id = token_decode.id;
        }
        else {
            return res.status(403).send('UnAutorized please login again')
        };
        next();
    } catch (err) {
        res.status(403).json({msg:'Invalid Token'})
    }
}

module.exports = {authToken};