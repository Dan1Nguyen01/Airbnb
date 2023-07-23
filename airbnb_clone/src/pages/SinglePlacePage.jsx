import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";

const SinglePlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState();
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";
  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen ">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-9 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-white-500 bg-white text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Close photos
            </button>
          </div>
          {place?.photo?.length > 0 &&
            place.photo.map((photo) => (
              <div className="flex justify-center">
                <img
                  src={`http://localhost:8888/uploads/${photo}`}
                  alt=""
                  className=""
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8 ">
      <h1 className="text-3xl">{place?.title}</h1>
      <a
        className=" flex gap-1 my-3 font-semibold underline"
        target="_blank"
        href={`https://maps.google.com?q=${place?.address}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>

        {place?.address}
      </a>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr_1fr] rounded-3xl overflow-hidden ">
          <div className="">
            {place?.photo?.[0] && (
              <div>
                <img
                  src={`http://127.0.0.1:8888/uploads/${place?.photo?.[0]}`}
                  alt=""
                  className="aspect-square object-cover cursor-pointer"
                  onClick={() => setShowAllPhotos(true)}
                />
              </div>
            )}
          </div>

          <div className="grid">
            {place?.photo?.[1] && (
              <img
                src={`http://127.0.0.1:8888/uploads/${place?.photo?.[1]}`}
                alt=""
                className="aspect-square object-cover cursor-pointer"
                onClick={() => setShowAllPhotos(true)}
              />
            )}

            <div className="overflow-hidden ">
              {place?.photo?.[2] && (
                <img
                  src={`http://127.0.0.1:8888/uploads/${place?.photo?.[2]}`}
                  alt=""
                  className="aspect-square object-cover cursor-pointer "
                  onClick={() => setShowAllPhotos(true)}
                />
              )}
            </div>
          </div>
          <div className="grid ">
            {place?.photo?.[3] && (
              <img
                src={`http://127.0.0.1:8888/uploads/${place?.photo?.[3]}`}
                alt=""
                className="aspect-square object-cover cursor-pointer"
                onClick={() => setShowAllPhotos(true)}
              />
            )}

            <div className="overflow-hidden ">
              {place?.photo?.[4] && (
                <img
                  src={`http://127.0.0.1:8888/uploads/${place?.photo?.[4]}`}
                  alt=""
                  className="aspect-square object-cover cursor-pointer "
                  onClick={() => setShowAllPhotos(true)}
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="absolute flex gap-1 bottom-2 right-2 py-2 px-4  bg-white rounded-2xl  shadow-md shadow-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
            />
          </svg>
          Show more photos
        </button>
      </div>

      <div className="mt-8 mb-8 gap-8 grid md:grid-cols-[2fr_1fr] grid-cols-1">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            <h5 className="py-1">About this place</h5>
            {place?.description}
          </div>
          Check-in: {place?.checkIn} <br />
          Check-out: {place?.checkOut} <br />
          Max number of guests: {place?.maxGuests}
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra Info</h2>
        </div>
        <div className="mb-4 mt-2 text=sm text-gray-700 leading-5 ">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
};

export default SinglePlacePage;
