import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);
  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  let totalPrice = place.price * numberOfNights;

  const bookYourPlace = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/booking", {
        place: place._id,
        checkIn,
        checkOut,
        numberOfGuests,
        price: totalPrice,
        name,
        email,
        phone: mobile,
      });
      const bookingId = response.data._id;
      setRedirect(`/account/bookings/${bookingId}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price} /per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className=" py-3 px-4">
            <label htmlFor="">Check in</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
            />
          </div>
          <div className=" py-3 px-4 border-l">
            <label htmlFor="">Check out </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </div>
        </div>
        <div className=" py-3 px-4 border-t">
          <label htmlFor="">Number of guests: </label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
            required
          />
        </div>
        {numberOfNights > 0 && (
          <div className=" py-3 px-4 border-t">
            <label htmlFor="">Your full name: </label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="">Email: </label>
            <input
              type="email"
              placeholder="abc@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="">Phone number: </label>
            <input
              type="tel"
              placeholder="123 456 7890"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>
        )}
      </div>
      <button className="primary mt-4" onClick={bookYourPlace}>
        Book this place
      </button>
    </div>
  );
};

export default BookingWidget;
