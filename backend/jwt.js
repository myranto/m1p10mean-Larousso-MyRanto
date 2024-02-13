require('dotenv').config();
const jwt = require('jsonwebtoken');
const isPathExcluded = require('./config');

function generateAccessToken(username) {
    return jwt.sign({ username: username }, process.env.TOKEN_SECRET, { expiresIn: '12h' });
}

 function authenticateToken(req, res, next) {
    if (!isPathExcluded(req)) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.status(401).json('veuillez vous connecter')
        jwt.verify(token, process.env.TOKEN_SECRET , (err , user) => {
            if (err) return res.status(403).json("accès interdit")
            else{
            req.user = user
            next()
            }
        })
    }else{
        next()
    }
}
module.exports = {
    authenticateToken,
    generateAccessToken
};