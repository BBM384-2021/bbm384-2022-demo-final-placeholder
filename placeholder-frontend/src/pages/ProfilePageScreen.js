import React from 'react'

import { createTheme, ThemeProvider } from "@mui/material/styles";
import PrimarySearchAppBar from '../components/homepage-screen/PrimarySearchAppBar';
import EventSideBar from '../components/homepage-screen/EventSideBar';
import ChatSideBar from '../components/homepage-screen/ChatSideBar';
import Profile from "../components/profilepage-screen/Profile"

const theme = createTheme();

export default function ProfilePageScreen() {

  return (
    <div>
      <PrimarySearchAppBar />
      <div>
        <EventSideBar />
        <Profile />
        <ChatSideBar />
      </div>
    </div>
  )
}