const express = require("express");
const router = express.Router();
const { bookAPlace } = require("../controllers/bookingController");
router.post("/", bookAPlace);

module.exports = router;
