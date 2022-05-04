import React from "react";
import Box from "@mui/material/Box";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TopBar from "../components/topbar/Topbar";
import EventSideBar from "../components/homepage-screen/EventSideBar";
import ChatSideBar from "../components/homepage-screen/ChatSideBar";
import MainFeed from "../components/homepage-screen/MainFeed";
import Profile from "../components/profilepage-screen/Profile";
import ErrorPage from "./error/ErrorPage";

import "./homePage.css";

export default function HomePageScreen({ user, setUser }) {
  const flexDisplay = true;
  return (
    <Box
      component={"div"}
      sx={{
        marginLeft: "10px",
        marginRight: "10px",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <TopBar userObj={user} setUser={setUser} />
      <div className="homeContainer">
        {flexDisplay && (
          <>
            <EventSideBar />

            <Routes>
              <Route path="/" element={<MainFeed user={user} />} />
              <Route path="/in/:user_id" element={<Profile />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>

            <ChatSideBar />
          </>
        )}
        {!flexDisplay && (
          <>
            <div
              style={{
                top: "18%",
                position: "absolute",
                width: "15%",
                height: "100%",
                maxHeight: "80%",
              }}
            >
              <EventSideBar />
            </div>

            <div
              style={{
                top: "18%",
                position: "absolute",
                margin: "0px 200px",
                width: "62%",
                height: "100%",
                zIndex: 1,
              }}
            >
              <MainFeed user={user} />
            </div>

            <div
              style={{
                top: "18%",
                right: 10,
                position: "fixed",
                width: "18%",
                height: "100%",
                maxHeight: "80%",
              }}
            >
              <ChatSideBar />
            </div>
          </>
        )}
      </div>
    </Box>
  );
}
