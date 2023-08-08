import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "../components/Image";
const IndexPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);
  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-8">
      {places.length > 0 &&
        places.map((place) => (
          <Link key={places._id} to={"/place/" + place._id}>
            <div className=" flex bg-gray-500 rounded-2xl mb-2">
              {place.photo?.[0] && (
                <Image
                  src={place.photo?.[0]}
                  alt=""
                  className="rounded-2xl object-cover aspect-square"
                />
              )}
            </div>
            <h3 className="font-bold">{place.address}</h3>
            <h2 className="text-sm truncate">{place.title}</h2>
            <div className="mt-1">
              <span className="font-bold">${place.price} </span>per night
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
