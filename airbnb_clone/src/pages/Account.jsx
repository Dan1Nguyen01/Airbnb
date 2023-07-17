import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, redirect, useParams } from "react-router-dom";
import axios from "axios";

const Account = () => {
  let { subpage } = useParams();
  const [redirect, setRedirect] = useState(null);

  if (subpage === undefined) {
    subpage = "profile";
  }
  function linkClasses(type = null) {
    let classes = "py-2 px-6";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full";
    }
    return classes;
  }
  const { user, setUser, ready } = useContext(UserContext);

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  async function logout() {
    await axios.post("/logout");
    setUser(null);
    setRedirect("/");
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <nav className="w-full flex justify-center gap-2 mt-8 mb-8">
        <Link className={linkClasses("profile")} to={"/account/"}>
          My profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My bookings
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          My accommodations
        </Link>
      </nav>

      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})
          <button className="primary max-w-sm mt-2" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Account;
