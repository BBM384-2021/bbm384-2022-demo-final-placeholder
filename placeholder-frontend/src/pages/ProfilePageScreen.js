import React from "react";
import { useParams } from "react-router-dom";
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
          height: "100%",
          margin: "0px",
          paddingTop: "2%",
          fontFamily: "Poppins"
        }}
      >
        <div style={{ top: '18%', position:'absolute', width:'15%', height: '100%', maxHeight:'80%'}}>
          <EventSideBar />
        </div>

        <div style={{ top: '18%', position: 'absolute', margin:'0px 250px', width:'62%', height: '100%', 
        zIndex: 1}}>

          <Profile user_id={user_id} />
        </div>
        
        <div style={{ top: '18%', right:10, position:'fixed', width:'18%', height: '100%', maxHeight:'80%'}}>
          <ChatSideBar />
        </div>
      </div>
    </Box>
  );
}
