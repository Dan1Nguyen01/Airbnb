const express = require("express");
const router = express.Router();
const { logout } = require("../controllers/userRegisterController");
router.post("/", logout);

module.exports = router;
