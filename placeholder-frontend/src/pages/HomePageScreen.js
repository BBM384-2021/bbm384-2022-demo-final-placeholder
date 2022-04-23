import React from "react";
import Box from "@mui/material/Box";

import TopBar from "../components/topbar/Topbar";
import EventSideBar from "../components/homepage-screen/EventSideBar";
import ChatSideBar from "../components/homepage-screen/ChatSideBar";
import MainFeed from "../components/homepage-screen/MainFeed";

export default function HomePageScreen({ user }) {
  const flexDisplay = true;
  return (
    <Box
      component={'div'}
      sx={{
        marginLeft: "10px",
        marginRight: "10px",
        flexDirection: "column",
        height:'100%',
      }}
    >
      <TopBar userObj={user} />
      <div
        style={{
          height: "100%",
          margin: "0px",
          paddingTop: "2%",
          fontFamily: "Poppins",
          display : "flex",
          justifyContent : "space-between"
        }}
      >

      {flexDisplay &&
        <>
          <EventSideBar />
          <MainFeed user={user}/>
          <ChatSideBar />
        </>

      }
      {!flexDisplay &&
        <>
          <div style={{ top: '18%', position:'absolute', width:'15%', height: '100%', maxHeight:'80%'}}>
            <EventSideBar />
          </div>

          <div style={{ top: '18%', position: 'absolute', margin:'0px 200px', width:'62%', height: '100%', 
          zIndex: 1}}>
            <MainFeed user={user}/>
          </div>
          
          <div style={{ top: '18%', right:10, position:'fixed', width:'18%', height: '100%', maxHeight:'80%'}}>
            <ChatSideBar />
          </div>
        </>
      }

        
      </div>
    </Box>
  );
}
