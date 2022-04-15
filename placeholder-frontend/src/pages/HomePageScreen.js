import React from 'react'
import TopBar from '../components/homepage-screen/TopBar';
import EventSideBar from '../components/homepage-screen/EventSideBar';
import ChatSideBar from '../components/homepage-screen/ChatSideBar';
import MainFeed from '../components/homepage-screen/MainFeed';

import Box from '@mui/material/Box';

export default function HomePageScreen() {

  return (
    <Box sx={{display:'flex', marginLeft:'10px', marginRight:'10px', flexDirection:'column'}}>
      <TopBar />
      <div style={{display:'flex', height:'80vh',margin:'0px', justifyContent:'space-between', paddingTop:'2%',
      fontFamily:'Poppins', flex:'auto'}}>
        <EventSideBar />
        <MainFeed />
        <ChatSideBar />
      </div>
    </Box>
  )
}