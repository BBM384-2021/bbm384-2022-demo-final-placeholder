import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Container,
} from "@mui/material";
import { Close } from "@mui/icons-material";

import { getUsersConnected } from "../../services/UserService";
import ProfileBanner from "../commons/ProfileBanner";
import ChatView from "../chat/ChatView";

import "./chatSidebar.css";
import { useNavigate } from "react-router";

export default function ChatSideBar({ user }) {
  const [connectedUsers, setConnectedUsers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getUsersConnected(user.id)
      .then((response) => {
        if (response.data.code === 200) {
          setConnectedUsers(response.data.connectedUsers);
          console.log(typeof response.data.connectedUsers);
          console.log(response.data.connectedUsers);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [user]);

  function openChatModal(userId) {
    console.log("Chat is open");
    return navigate(`/chat/${userId}`);

    //TODO: Modal ekle chatView koy icine
    //! diger islemleri etkilemeden modal acik kalabilir mi ona bak
  }

  // const handleDrawerClose = () => {
  //   setChatOpen(false);
  // };
  return (
    <div className="chatSidebar">
      <div >
        <h3 style={{ color: "#888888" }}>Chat</h3>
        {Object.values(connectedUsers).map((connection) => {
          // return <div>{connection.full_name}</div>;
          return (
            <div key={connection.id} className="bannerContainer">
              <ProfileBanner
                contentType="chat"
                user={connection}
                status="Tap to chat"
                handleChatOpen={() => openChatModal(connection.id)}
              />
            </div>
          );
        })}
        {/* <ChatPortal>
          <Drawer
            className=".MuiDrawer-paperAnchorDockedBottom"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            anchor="bottom"
            variant="persistent"
            open={chatOpen}
            ModalProps={{
              keepMounted: true,
              sx: {
                height: "50%",
                position: "relative",
                paddingRight: "300px",
              },
              position: { X: 330, Y: 50 },
            }}
            PaperProps={
              {
                sx: {
                  height: "50%",
                  position: "absolute",
                  right: 20,
                  bottom: 0,
                },
                // position: { X: 330, Y: 50 },
              }
            }
          >
            <div>
              <IconButton onClick={handleDrawerClose}>
                <Close />
              </IconButton>
            </div>
            <Divider />
           <ChatView></ChatView> 
          </Drawer>
        </ChatPortal> */}
      </div>
    </div>
  );
}
