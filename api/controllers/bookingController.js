const jwt = require("jsonwebtoken");
const User = require("../models/userModel/User");
require("dotenv").config();

const bookAPlace =  (req, res) => {
  const { place, checkIn, checkOut, numberOfGuests, name, email, mobile } = req.body;
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWTSECRET,{}, async(error, userData)=> {
    if(error) throw error;
    const 
  });
};

module.exports = { bookAPlace };
