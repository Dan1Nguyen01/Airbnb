import React, { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import { Link } from "react-router-dom";
import { format, differenceInCalendarDays } from "date-fns";
import BookingDates from "../components/BookingDates";
const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get("/booking").then((response) => {
      setBookings(response.data);
    });
  }, []);

  return (
    <div>
      <AccountNav />

      <div>
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link to={`/account/bookings/${booking._id}`}>
              {booking?.place?.photo?.length > 0 && (
                <div className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
                  <div className="w-48">
                    <img
                      className=""
                      src={
                        "https://tame-lime-seagull-toga.cyclic.app/uploads/" +
                        booking?.place?.photo[0]
                      }
                      alt=""
                    />
                  </div>
                  <div className="py-3 pr-3   grow">
                    <h2 className="text-xl">{booking?.place?.title}</h2>

                    <div className="text-xl">
                      <BookingDates booking={booking} />
                      <div className="flex gap-1 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-7 h-7"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                          />
                        </svg>
                        <span className="text-xl">
                          Total price: ${booking.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BookingsPage;
