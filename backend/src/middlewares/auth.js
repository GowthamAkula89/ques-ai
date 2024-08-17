const jwt = require('jsonwebtoken');
require('dotenv').config()

const authenticateJWT = async(req, res, next) => {
    console.log("auth")
    let token = req.header('Authorization');
    
    if(!token) return res.status(401).json({ message: 'Access Denied' });
    token = token.split(' ')[1];
    console.log("token", token) 
    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        // console.log("verified", req.user)
        next()
    }catch(err){
      console.log(err)
        res.status(400).json({ message: 'Invalid Token' });
    }
    
}

  
  module.exports = { authenticateJWT };