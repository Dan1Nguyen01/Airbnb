const express = require("express");
const router = express.Router();
const {
  newPlaces,
  yourPlaces,
  getAPlace,
  updateAPlace,
  places,
} = require("../controllers/placesController");

router.get("/user-places", yourPlaces);

router.get("/:id", getAPlace);

router.post("/", newPlaces);

router.put("/", updateAPlace);

router.get("/", places);

module.exports = router;
