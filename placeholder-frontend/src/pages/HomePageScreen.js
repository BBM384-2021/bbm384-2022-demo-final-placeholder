import React from "react";
import Box from "@mui/material/Box";

import TopBar from "../components/topbar/Topbar";
import EventSideBar from "../components/homepage-screen/EventSideBar";
import ChatSideBar from "../components/homepage-screen/ChatSideBar";
import MainFeed from "../components/homepage-screen/MainFeed";
import "./homePage.css";

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
        className="homeContainer"
      >
        <EventSideBar />
        <MainFeed />
        <ChatSideBar />
      </div>
    </Box>
  );
}
