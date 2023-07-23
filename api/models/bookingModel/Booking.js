const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  place: {
    type: mongoose.Schema.ObjectId,
    require: true,
  },
  checkIn: {
    type: Date,
    require: true,
  },
  checkOut: {
    type: Date,
    require: true,
  },
});
