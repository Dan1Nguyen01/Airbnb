import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, redirect, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";

const ProfilePage = () => {
  let { subpage } = useParams();
  const [redirect, setRedirect] = useState(null);
  const { user, setUser, ready } = useContext(UserContext);

  useEffect(() => {
    if (ready && !user) {
      setRedirect("/login");
    }
  }, [user, ready]);

  if (!ready) {
    // You can show a loading spinner here while waiting for the user data to be fetched
    return <div>Loading...</div>;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  if (subpage === undefined) {
    subpage = "profile";
  }

  const logout = async (e) => {
    e.preventDefault();
    await axios.post("/logout");
    setUser(null);
    setRedirect("/"); // Set the redirect state to the default page "/"
  };

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user?.name} ({user?.email})
          <button className="primary max-w-sm mt-2" onClick={logout}>
            Logout
          </button>
        </div>
      )}

      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

export default ProfilePage;
