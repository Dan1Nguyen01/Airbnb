import React from "react";
import { Link, useParams } from "react-router-dom";

const PlacesPage = () => {
  const { action } = useParams();

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full "
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}

      {action === "new" && (
        <form>
          <h2 className="text-2xl mt-4">Title</h2>
          <p className="text-gray-500 text-sm">
            Titlte for your place should be catchy and advertising
          </p>
          <input type="text" placeholder="title, for ex: My lovely apartment" />
          <h2 className="text-2xl mt-4">address</h2>
          <p className="text-gray-500 text-sm">Address to this place</p>
          <input type="text" placeholder="address" />
          <h2 className="text-2xl mt-4">Photos</h2>
          <p className="text-gray-500 text-sm">More= better</p>
          <div className="flex gap-2">
            <input type="text" placeholder="Add using a link ... jpg" />
            <button className="bg-gray-200 px-4 rounded-2xl">
              Add&nbsp;Photo
            </button>
          </div>
          <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <button className="flex gap-1 justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
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
                  d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
                />
              </svg>
              Upload
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PlacesPage;
