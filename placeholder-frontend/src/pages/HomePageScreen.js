import React from "react";
import Box from "@mui/material/Box";
import { Routes, Route, BrowserRouter, Switch } from "react-router-dom";

import TopBar from "../components/homepage-screen/TopBar";
import EventSideBar from "../components/homepage-screen/EventSideBar";
import ChatSideBar from "../components/homepage-screen/ChatSideBar";
import MainFeed from "../components/homepage-screen/MainFeed";
import ProfilePageScreen from "./ProfilePageScreen";
import ErrorPage from "./error/ErrorPage";

export default function HomePageScreen({ user }) {
  return (
    <Box
      sx={{
        display: "flex",
        marginLeft: "10px",
        marginRight: "10px",
        flexDirection: "column",
      }}
    >
      <TopBar userObj={user} />
      <div
        style={{
          display: "flex",
          height: "80vh",
          margin: "0px",
          justifyContent: "space-between",
          paddingTop: "2%",
          fontFamily: "Poppins",
          flex: "auto",
        }}
      >
        <EventSideBar />
        <div>
          <Routes>
            <Route path="*" component={<ErrorPage />} />
            <Route path="/" component={<MainFeed />} />
            <Route path="/in/:user_id" component={<ProfilePageScreen sessionUser={user}/>} />
            {/* <Route path="/mainPage" element={<HomePageScreen />} /> */}
          </Routes>
        </div>
        <ChatSideBar />
      </div>
    </Box>
  );
}

// <Routes>
//   <Route path="/" component={<MainFeed />} />
//   <Route path="/in/:user_id" component={<ProfilePageScreen />} />
//   <Route path="*" component={<ErrorPage />} />
//   {/* <Route path="/mainPage" element={<HomePageScreen />} /> */}
// </Routes>
