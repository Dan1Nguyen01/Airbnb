const User = require("../models/userModel/User");
const Booking = require("../models/bookingModel/Booking");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const bookAPlace = (req, res) => {
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

  const { token } = req.cookies;
  jwt.verify(token, process.env.JWTSECRET, {}, async (error, userData) => {
    if (error) throw error;
    const booking = await Booking.create({
      place,
      user: userData.id,
      checkIn,
      checkOut,
      name,
      numberOfGuests,
      email,
      phone,
      price,
    });
    res.status(201).json(booking);
  });
};

const getBooking = (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, process.env.JWTSECRET, {}, async (error, userData) => {
    if (error) throw error;
    const booking = await Booking.find({ user: userData.id })
      .populate("place")
      .populate("user");

    res.status(200).json(booking);
  });
};
module.exports = { bookAPlace, getBooking };
