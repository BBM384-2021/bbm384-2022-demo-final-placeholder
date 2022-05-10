import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Paper } from "@mui/material";

import { getUser } from "../../services/UserService";
import { getMessages } from "../../services/ChatService";
import { ChatTextInput } from "./ChatTextInput";
import { MessageLeft, MessageRight } from "./Message";
import ErrorPage from "../../pages/error/ErrorPage";
import ChatHeader from "./ChatHeader.js";

import "./Chat.css";

/* 
TODO: 
if messages.lenght > 50 only load the last 50 elements of that array? maybe idk


*/

export default function ChatView({ sessionUser }) {
  const { user_id } = useParams();
  const [noSuchUser, setNoSuchUser] = useState(false);
  const [user, setUser] = useState({});
  const [futuremessages, setMessages] = useState({});

  const messages = [
    {
      id: 11,
      sender_id: 471,
      receiver_id: 511,
      body: "selammm",
      date: "2022-05-10T00:23:53.375Z",
    },
    {
      id: 21,
      sender_id: 511,
      receiver_id: 471,
      body: "Selam",
      date: "2022-05-10T00:23:53.375Z",
    },
    {
      id: 31,
      sender_id: 471,
      receiver_id: 511,
      body: "Naber",
      date: "2022-05-10T00:23:53.375Z",
    },
  ];

  useEffect(() => {
    // first user check
    getUser(user_id).then((res) => {
      if (res.data.code === 200) {
        setUser(res.data.user);
        console.log("user:", res);
        setNoSuchUser(false);
      } else {
        setNoSuchUser(true);
      }
    });
    // then get message log for that user
    getMessages({ session_id: sessionUser.id, user_id: user_id }).then(
      (response) => {
        console.log(response.data.code);
      }
    );
  }, [user_id, sessionUser.id]);

  if (noSuchUser) {
    return <ErrorPage></ErrorPage>;
  }

  return (
    <div className={"chatContainer"}>
      <Paper className={"paper"}>
        <ChatHeader user={user}></ChatHeader>
        <Paper id="style-1" className={"messagesBody"}>
          {messages.map((data) => {
            if (parseInt(data.sender_id) === parseInt(user_id)) {
              return (
                <MessageLeft
                  key={data.id}
                  message={data.body}
                  timestamp={data.date}
                  photoURL={user.profile_pic_path}
                  displayName={user.full_name}
                  avatarDisp={true}
                />
              );
            } else {
              return (
                <MessageRight
                  key={data.id}
                  message={data.body}
                  timestamp={data.date}
                  photoURL={sessionUser.profile_pic_path}
                  displayName="You"
                  avatarDisp={true}
                />
              );
            }
          })}
        </Paper>
        <ChatTextInput />
      </Paper>
    </div>
  );
}
