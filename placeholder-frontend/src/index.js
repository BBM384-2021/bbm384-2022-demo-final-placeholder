import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import HomePageScreen from "./pages/HomePageScreen";
import ProfilePageScreen from "./pages/ProfilePageScreen";

// here comes router
import { Routes, Route, BrowserRouter, Redirect } from "react-router-dom";
import ErrorPage from "./pages/error/ErrorPage";


const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/" element={<App />} />
      {/* <Route path="/mainPage" element={<HomePageScreen />} /> */}
      <Route path="/in/:user_id" element={<ProfilePageScreen />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
