const User = require("../models/userModel/User");
const bcrypt = require("bcrypt");
const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hash,
  });

  res.status(200).json(user);
};

module.exports = createUser;
