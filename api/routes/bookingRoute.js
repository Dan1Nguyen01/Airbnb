const express = require("express");
const router = express.Router();
const { bookAPlace, getBooking } = require("../controllers/bookingController");

router.post("/", bookAPlace);
router.get("/", getBooking);

module.exports = router;
