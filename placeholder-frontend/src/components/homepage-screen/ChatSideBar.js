import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";

import { getUsersConnected } from "../../services/UserService";

import "./chatSidebar.css";
import ProfileBanner from "../commons/ProfileBanner";

export default function ChatSideBar({ user }) {
  const [connectedUsers, setConnectedUsers] = useState({});
  const [chatOpen, setChatOpen] = useState(true);

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

  function openChatModal(user) {
    console.log("Chat is open");
    //TODO: Modal ekle chatView koy icine
    //! diger islemleri etkilemeden modal acik kalabilir mi ona bak
  }

  return (
    <div className="chatSidebar">
      <div style={{ marginLeft: "31px" }}>
        <h3 style={{ color: "#888888" }}>Chat</h3>
        {Object.values(connectedUsers).map((connection) => {
          // return <div>{connection.full_name}</div>;
          return (
            <div key={connection.id} className="bannerContainer">
              <ProfileBanner
                contentType="chat"
                user={connection}
                status="Tap to chat"
                handleChatOpen={openChatModal}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
