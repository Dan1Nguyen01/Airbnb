const express = require("express");
const router = express.Router();
const {
  newPlaces,
  yourPlaces,
  getAPlace,
  updateAPlace,
} = require("../controllers/placesController");

router.get("/", yourPlaces);

router.get("/:id", getAPlace);

router.post("/", newPlaces);

router.put("/", updateAPlace);

module.exports = router;
