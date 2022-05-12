import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Send } from "@mui/icons-material";
import { sendMessage } from "../../services/ChatService";

import "./Chat.css";

export const ChatTextInput = ({
  sender_id,
  user_id,
  setNewMessage,
  newMessage,
}) => {
  const [message, setMessage] = useState("");
  const handleMessage = (event) => {
    event.preventDefault();
    console.log("Send Message press");
    if (message) {
      sendMessage({
        sender_id: sender_id,
        receiver_id: user_id,
        message: message,
      }).then((response) => {
        if (response.data.code === 200) {
          setMessage("");
          setNewMessage(true);
        } else {
          console.error(response.data);
          alert(
            "We cannot process your message at the moment, please try again later!"
          );
        }
      });
    }
  };

  return (
    <form
      className={"wrapForm"}
      noValidate
      autoComplete="off"
      onSubmit={(event) => handleMessage(event)}
    >
      <TextField
        id="standard-text"
        label="Message"
        className={"wrapText"}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        //margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: "#FF1F2D",
          marginTop: 0.5,
          marginBottom: 2,
          marginLeft: 1,
          borderRadius: "20px",
        }}
        className={"button"}
      >
        <Send />
      </Button>
    </form>
  );
};
