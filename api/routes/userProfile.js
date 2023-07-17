const express = require("express");
const router = express.Router();
const userProfile = require("../controllers/userProfile");
router.get("/", userProfile);

module.exports = router;
