const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
  },
  address: {
    type: String,
  },
  photo: [String],
  description: {
    type: String,
  },
  perk: [String],
  extraInfo: {
    type: String,
  },
  checkIn: {
    type: Number,
  },
  checkOut: {
    type: Number,
  },
  maxGuests: {
    type: Number,
  },
  price: {
    type: Number,
  },
});

const PlaceModel = mongoose.model("Place", PlaceSchema);

module.exports = PlaceModel;
