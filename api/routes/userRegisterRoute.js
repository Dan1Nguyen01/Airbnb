const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/userRegisterController");

router.post("/", createUser);

module.exports = router;
