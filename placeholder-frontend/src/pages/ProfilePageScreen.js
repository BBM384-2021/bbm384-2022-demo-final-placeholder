import React from 'react'

import { createTheme, ThemeProvider } from "@mui/material/styles";
import PrimarySearchAppBar from '../components/PrimarySearchAppBar';
import EventSideBar from '../components/EventSideBar';
import ChatSideBar from '../components/ChatSideBar';
import Profile from "../components/profilepage-screen/Profile"

const theme = createTheme();

export default function ProfilePageScreen() {

  return (
    <div>
      <PrimarySearchAppBar />
      <div>
        <Profile />
      </div>
    </div>
  )
}