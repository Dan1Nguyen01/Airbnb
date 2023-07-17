const User = require("../models/userModel/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(401)
        .json({ error: "You already have an account with this email" });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hash,
    });

    res.status(200).json(newUser);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "You have not sign up !" });
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(422).json({ error: "Your password is not correct !" });
    }
    jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWTSECRET,
      {},
      (error, token) => {
        if (error) throw error;
        return res.status(200).cookie("token", token).json(user);
      }
    );
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
};

module.exports = { createUser, loginUser };
