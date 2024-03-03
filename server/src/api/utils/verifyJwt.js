const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
require("dotenv").config();

const verifyJwt = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  if (!authHeader) return res.sendStatus(401);
  console.log(authHeader); // Bearer token
  const token = authHeader.split(" ")[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_PRIVATE_KEY,
    async (err, decoded) => {
      if (err) return res.sendStatus(403); //invalid token
      req.user = decoded.username;
      try {
        console.log(decoded.username);
        const response = await userModel.findOne({
          $and: [{ username: decoded.username }, { isBlocked: false },{role:'user'}],
        });
        console.log(response);
        console.log("aba");
        if (!response) return res.sendStatus(402);
      } catch (error) {
        console.log(error);
        res.sendStatus(402);
      }
      next();
    }
  );
};

module.exports = verifyJwt;
