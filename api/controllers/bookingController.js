const User = require("../models/userModel/User");
const Booking = require("../models/bookingModel/Booking");
require("dotenv").config();

const bookAPlace = async (req, res) => {
  const {
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    email,
    phone,
    price,
  } = req.body;

  console.log(req.body);
  try {
    const booking = await Booking.create({
      place,
      checkIn,
      checkOut,
      name,
      numberOfGuests,
      email,
      phone,
      price,
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: "System error, pleaes try again later" });
  }
};

module.exports = { bookAPlace };
