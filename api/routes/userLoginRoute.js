const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/userRegisterController");
router.post("/", loginUser);

module.exports = router;
