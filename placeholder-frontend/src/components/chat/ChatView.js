import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Paper } from "@mui/material";

import { getUser } from "../../services/UserService";
import { getMessages } from "../../services/ChatService";
import { ChatTextInput } from "./ChatTextInput";
import Message from "./Message";
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
  const [newMessage, setNewMessage] = useState(false);
  const [messages, setMessages] = useState({});
  const messagesEnd = useRef(null);
  const fakemessages = [
    {
      id: 11,
      sender_id: 471,
      receiver_id: 511,
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
        getMessages({
          session_id: sessionUser.id,
          user_id: parseInt(user_id),
        }).then((response) => {
          if (response.data.code === 200) {
            setMessages(response.data.messages);
          }
        });
        setNoSuchUser(false);
      } else {
        setNoSuchUser(true);
      }
    });
    // then get message log for that user
    // getMessages({ session_id: sessionUser.id, user_id: user_id }).then(
    //   (response) => {
    //     console.log(response.data.code);
    //   }
    // );
  }, [user_id, sessionUser.id]);

  useEffect(() => {
    console.log("New Message detected");
    if (newMessage) {
      getMessages({ session_id: sessionUser.id, user_id: user_id }).then(
        (response) => {
          if (response.data.code === 200) {
            console.log("messages", response.data.messages);
            setMessages(response.data.messages);
            setNewMessage(false);
          }
        }
      );
    }
  }, [newMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (noSuchUser) {
    return <ErrorPage></ErrorPage>;
  }

  return (
    <Paper className={"chatContainer"}>
      <ChatHeader user={user}></ChatHeader>
      <Paper id="style-1" className={"messagesBody"}>
        {messages.length === 0 && (
          <div className="noMessages">
            <h2>Send a Message and Say Hi!</h2>
          </div>
        )}
        {Object.values(messages).map((data) => {
          if (parseInt(data.sender_id) === parseInt(user_id)) {
            return (
              <Message
                key={data.id}
                owned={false}
                data={data}
                user={user}
                sessionUser={sessionUser}
              />
            );
          } else {
            return (
              <Message
                key={data.id}
                data={data}
                owned={true}
                user={user}
                sessionUser={sessionUser}
              />
            );
          }
        })}
        <div ref={messagesEnd} />
      </Paper>
      <ChatTextInput
        sender_id={sessionUser.id}
        user_id={user.id}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
      />
    </Paper>
  );
}
