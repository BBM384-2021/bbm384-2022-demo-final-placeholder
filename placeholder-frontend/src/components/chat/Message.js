import React, { useState } from "react";
import { Avatar, IconButton } from "@mui/material/";
import { Cancel, CheckCircle, Edit, Delete } from "@mui/icons-material";

import { Colors } from "../../Colors";
import { convertMs2TimeString as timeStamp } from "../commons/Comment";

import defaultProfilePic from "../../img/defaultProfilePic.png";
import "./Chat.css";
import { deleteMessage, updateMessage } from "../../services/ChatService";
import ConfirmationDialog from "../commons/ConfirmationDialog";

export default function Message({ key, data, owned, sessionUser, user }) {
  const [open, setOpen] = useState(false); // for delete confirmation
  const [edit, setEdit] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [message, setMessage] = useState(data.body);
  const [oldMessage, setOldMessage] = useState(data.body);
  const photoURL = owned
    ? sessionUser.profile_pic_path
      ? sessionUser.profile_pic_path
      : defaultProfilePic
    : user.profile_pic_path
    ? user.profile_pic_path
    : defaultProfilePic;
  const displayName = owned ? "You" : sessionUser.full_name;
  const currTime = new Date();
  const commentTime = new Date(data.date);
  const timeDiff = currTime - commentTime;

  const editChange = (event) => {
    setMessage(event.target.value);
  };
  const editCancel = (event) => {
    setMessage(oldMessage);
    setEdit(false);
  };

  const submitMessageEdit = (event) => {
    event.preventDefault();
    if (message) {
      updateMessage({ message_id: data.id, message: message }).then(
        (response) => {
          console.log("key and message", data.id, message);
          if (response.data.code === 200) {
            setOldMessage(message);
            setEdit(false);
          } else {
            alert(response.data.error);
          }
        }
      );
    } else {
      setMessage(oldMessage);
      setEdit(false);
    }
  };
  const handleDeleteMessage = () => {
    deleteMessage(data.id).then((response) => {
      if (response.data.code === 200) {
        setOpen(false);
        setDeleted(true);
      } else {
        console.error(response.data);
        alert("There was a problem! Please try again.");
      }
    });
  };

  if (deleted) {
    return <></>;
  }

  return (
    <div className={owned ? "messageRowRight" : "messageRow"}>
      {!owned && <Avatar alt={displayName} src={photoURL}></Avatar>}
      <div>
        <div className={owned ? "message right" : "message left"}>
          <div className={"messageTimeStampRight"}>{timeStamp(timeDiff)}</div>
          <div className="textContainer">
            {edit ? (
              <form noValidate autoComplete="off" onSubmit={submitMessageEdit}>
                <textarea
                  className="editMessage"
                  value={message}
                  onChange={editChange}
                ></textarea>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <IconButton type="submit" variant="raised">
                    <CheckCircle color="success" />
                  </IconButton>
                  <IconButton onClick={editCancel} variant="raised">
                    <Cancel />
                  </IconButton>
                  <div style={{ flexGrow: 1 }} />
                  <IconButton onClick={() => setOpen(true)} variant="raised">
                    <Delete />
                  </IconButton>
                </div>
              </form>
            ) : (
              <p className={"messageContent"}>{message}</p>
            )}
          </div>
        </div>
      </div>
      {owned && (
        <IconButton
          onClick={() => setEdit(true)}
          variant="raised"
          sx={{ "&:hover": { backgroundColor: "transparent" } }}
        >
          <Edit />
        </IconButton>
      )}
      <ConfirmationDialog
        open={open}
        setOpen={setOpen}
        onConfirm={handleDeleteMessage}
      >
        Your Message Will Be Deleted Permanently!
      </ConfirmationDialog>
    </div>
  );
}
