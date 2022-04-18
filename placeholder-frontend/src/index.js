import React from "react";
// here comes router
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import HomePageScreen from "./pages/HomePageScreen";
import ProfilePageScreen from "./pages/ProfilePageScreen";
import ErrorPage from "./pages/error/ErrorPage";

import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<App />} />
      <Route path="*" element={<ErrorPage />} />
      {/* <Route path="/mainPage" element={<HomePageScreen />} /> */}
      {/* <Route path="/in/:user_id" element={<ProfilePageScreen />} /> */}
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
