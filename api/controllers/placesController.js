const Place = require("../models/placeModel/Place");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();
const newPlaces = (req, res) => {
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWTSECRET, {}, async (error, userData) => {
    if (error) throw error;
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      photo: addedPhotos,
      description,
      perk: perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(placeDoc);
  });
};

const yourPlaces = (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, process.env.JWTSECRET, {}, async (error, userData) => {
    if (error) throw error;

    const places = await Place.find({ owner: userData.id });
    res.status(200).json(places);
  });
};

const getAPlace = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such artist" });
  }
  const place = await Place.findById(id);
  res.status(200).json(place);
};

const updateAPlace = async (req, res) => {
  const { token } = req.cookies;
  // const { id } = req.params;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, process.env.JWTSECRET, {}, async (error, userData) => {
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photo: addedPhotos,
        description,
        perk: perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.status(200).json("ok");
    }
  });
};

const places = async (req, res) => {
  const places = await Place.find();
  res.status(200).json(places);
};
module.exports = { newPlaces, yourPlaces, getAPlace, updateAPlace, places };
