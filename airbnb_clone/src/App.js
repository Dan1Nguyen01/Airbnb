import React from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./UserContext";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./layout/Layout";
import { RegisterPage } from "./pages/RegisterPage";
import axios from "axios";
import Account from "./pages/Account";
axios.defaults.baseURL = "http://127.0.0.1:8888";
axios.defaults.withCredentials = true;
const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/:subpage?" element={<Account />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
