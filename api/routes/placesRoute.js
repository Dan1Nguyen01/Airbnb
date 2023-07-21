const express = require("express");
const router = express.Router();
const { newPlaces } = require("../controllers/placesController");
router.post("/", newPlaces);
module.exports = router;
