import React, { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import PhotoUploader from "../components/PhotoUploader";
import Perks from "../components/Perks";
import axios from "axios";
import AccountNav from "../components/AccountNav";
const PlacesFormPage = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDiscription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);

  // prevent hardcode
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  // prevent hardcode
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  // prevent hardcode
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function addNewPlace(e) {
    e.preventDefault();
    await axios.post("/places", {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    setRedirect(true);
  }
  if (redirect) {
    <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={addNewPlace}>
        {preInput(
          "Title",
          "Titlte for your place should be catchy and advertising"
        )}

        <input
          type="text"
          placeholder="title, for ex: My lovely apartment"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {preInput("Address", "Address to this place")}
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {preInput("Photos", "More = better")}
        <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("Description", "Discription of the place")}
        <textarea
          className=""
          value={description}
          onChange={(e) => setDiscription(e.target.value)}
        />
        {preInput("Perks", "Select all the perks of your place")}
        <Perks selected={perks} onChange={setPerks} />
        {preInput("Extra Info", "House rules, etc")}

        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        {preInput(
          "Check in&out times, max guests",
          "Check in&out time, remember to close the window and cleaning the room between guest"
        )}

        <div className="grid sm:grid-cols-3 gap-1">
          <div>
            <h3 className="mt-2 -mb-1 ">Check In time</h3>
            <input
              type="text"
              placeholder="12:00"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1 ">Check Out time</h3>
            <input
              type="text"
              placeholder="09:00"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1 ">Max Guests </h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
};

export default PlacesFormPage;
