import React from "react";

const PlaceGallery = ({ place }) => {
  const [showAllPhotos, setShowAllPhotos] = React.useState(false);
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
    <div className="relative">
      <div className="grid gap-2 grid-cols-[2fr_1fr_1fr] rounded-3xl overflow-hidden ">
        <div className="">
          {place?.photo?.[0] && (
            <div>
              <img
                src={`https://airbandb-clone.onrender.com/uploads/${place?.photo?.[0]}`}
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
              src={`https://airbandb-clone.onrender.com/uploads/${place?.photo?.[1]}`}
              alt=""
              className="aspect-square object-cover cursor-pointer"
              onClick={() => setShowAllPhotos(true)}
            />
          )}

          <div className="overflow-hidden ">
            {place?.photo?.[2] && (
              <img
                src={`https://airbandb-clone.onrender.com/uploads/${place?.photo?.[2]}`}
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
              src={`https://airbandb-clone.onrender.com/uploads/${place?.photo?.[3]}`}
              alt=""
              className="aspect-square object-cover cursor-pointer"
              onClick={() => setShowAllPhotos(true)}
            />
          )}

          <div className="overflow-hidden ">
            {place?.photo?.[4] && (
              <img
                src={`https://airbandb-clone.onrender.com/uploads/${place?.photo?.[4]}`}
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
  );
};

export default PlaceGallery;
