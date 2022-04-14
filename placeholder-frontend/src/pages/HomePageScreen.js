import React from 'react'

import { createTheme, ThemeProvider } from "@mui/material/styles";
import PrimarySearchAppBar from '../components/homepage-screen/PrimarySearchAppBar';
import EventSideBar from '../components/homepage-screen/EventSideBar';
import ChatSideBar from '../components/homepage-screen/ChatSideBar';
import MainFeed from '../components/homepage-screen/MainFeed';

import Box from '@mui/material/Box';

export default function HomePageScreen() {

  return (
    <Box>
          <div>
            <PrimarySearchAppBar />
            <div>
              <EventSideBar />
              <MainFeed />
              <ChatSideBar />
            </div>
          </div>
    </Box>
  )
}