import React from 'react'

import { createTheme, ThemeProvider } from "@mui/material/styles";
import PrimarySearchAppBar from '../components/PrimarySearchAppBar';
import EventSideBar from '../components/EventSideBar';
import ChatSideBar from '../components/ChatSideBar';
import MainFeed from '../components/homepage-screen/MainFeed';

import Box from '@mui/material/Box';

export default function HomePageScreen() {

  return (
    <Box sx={{ display:'flex', flexDirection:'column', height:'100vh',bgcolor: '#F5F5F5'}}>
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