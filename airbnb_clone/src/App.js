import React from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./layout/Layout";
import { RegisterPage } from "./pages/RegisterPage";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8888";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

export default App;