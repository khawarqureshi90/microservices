const jwt = require('jsonwebtoken');
const {UsersItems} = require('../models/registeruser');

const protect = async(req, res, next) => {
    let token
    const JWT = "abc123";  // Sort out .ENV file

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //get token from header
            token = req.headers.authorization.split(' ')[1]
            //verify token
            const decoded = jwt.verify(token, JWT)
            //get user from token
            req.user = await UsersItems.findById(decoded.id).select('-password')
            next()

        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized')
    }
}

module.exports = {protect}