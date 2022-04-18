import React from "react";
import { useParams } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import TopBar from "../components/homepage-screen/TopBar";
import EventSideBar from "../components/homepage-screen/EventSideBar";
import ChatSideBar from "../components/homepage-screen/ChatSideBar";
import Profile from "../components/profilepage-screen/Profile";

export default function ProfilePageScreen({ sessionUser }) {
  const { user_id } = useParams();
  const isSessionUser = user_id === sessionUser.user_id ? true : false;

  return (
    <Box
      sx={{
        display: "flex",
        marginLeft: "10px",
        marginRight: "10px",
        flexDirection: "column",
      }}
    >
      <Profile user_id={user_id} />
    </Box>
  );
}
