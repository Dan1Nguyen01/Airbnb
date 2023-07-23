const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  place: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
  },

  numberOfGuests: {
    type: Number,
    required: true,
  },
});

const BookingModel = mongoose.model("Booking", BookingSchema);
module.exports = BookingModel;
