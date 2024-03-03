

const jwt = require('jsonwebtoken');
const userModel=require('../models/userModel')
require('dotenv').config();

const verifyOwnerJwt = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    if (!authHeader) return res.sendStatus(401);
    console.log(authHeader); // Bearer token
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_PRIVATE_KEY,
       async  (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
           
            try {
                req.user = decoded.username; 

                const response = await userModel.find({ role: 'owner', username:decoded.username,isBlocked:false },);
                
                if(response) next();

                else return res.sendStatus(402)
            } catch (error) {
                console.log(error)
                return res.sendStatus(402)
            }

            
        }
    );
}

module.exports = verifyOwnerJwt