import React from "react";
import Box from "@mui/material/Box";
import { Routes, Route } from "react-router-dom";

import TopBar from "../components/topbar/Topbar";
import EventSideBar from "../components/homepage-screen/EventSideBar";
import ChatSideBar from "../components/homepage-screen/ChatSideBar";
import MainFeed from "../components/homepage-screen/MainFeed";
import Profile from "../components/profilepage-screen/Profile";
import ErrorPage from "./error/ErrorPage";
import ChatView from "../components/chat/ChatView";
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
        height: "100vh",
        display: "flex",
      }}
    >
      {/* <ChatPortalDiv /> */}

      <TopBar userObj={user} setUser={setUser} />
      <div className="homeContainer">
        {flexDisplay && (
          <>
            <EventSideBar user={user} />

            <Routes>
              <Route
                path="/"
                element={
                  <MainFeed
                    user={user}
                    sessionUser={user}
                    setSessionUser={setUser}
                  />
                }
              />
              <Route
                path="/in/:user_id"
                element={
                  <Profile sessionUser={user} setSessionUser={setUser} />
                }
              />
              <Route
                path="/chat/:user_id"
                element={
                  <ChatView sessionUser={user} setSessionUser={setUser} />
                }
              />
              <Route
                path="*"
                element={
                  <div className="errorMiddle">
                    <ErrorPage />
                  </div>
                }
              />
            </Routes>

            <ChatSideBar user={user} />
          </>
        )}
      </div>
    </Box>
  );
}
