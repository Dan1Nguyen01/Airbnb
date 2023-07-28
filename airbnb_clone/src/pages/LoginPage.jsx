import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/login`, { email, password });
      setUser(response.data);
      alert("Successful login");

      setRedirect(true);
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h3 className="text-4xl text-center mb-4">Login Page</h3>
        <form className="max-w-md mx-auto" action="" onSubmit={loginUser}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black " to={"/register"}>
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
