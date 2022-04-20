import React from "react";
import { useParams } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import TopBar from "../components/topbar/Topbar";
import EventSideBar from "../components/homepage-screen/EventSideBar";
import ChatSideBar from "../components/homepage-screen/ChatSideBar";
import Profile from "../components/profilepage-screen/Profile";


export default function ProfilePageScreen() {
  const { user_id } = useParams();
  return (
    <Box
      sx={{
        display: "flex",
        marginLeft: "10px",
        marginRight: "10px",
        flexDirection: "column",
      }}
    >
      <TopBar />
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
        <Profile user_id={user_id} />
        <ChatSideBar />
      </div>
    </Box>
  );
}
