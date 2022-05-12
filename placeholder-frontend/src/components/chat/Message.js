import React from "react";
import Avatar from "@mui/material/Avatar";

import { Colors } from "../../Colors";
import { convertMs2TimeString as timeStamp } from "../commons/Comment";

import defaultProfilePic from "../../img/defaultProfilePic.png";
import "./Chat.css";

export default function Message({ data, owned, sessionUser, user }) {
  const message = data.body ? data.body : "can not load...";
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
  return (
    <div className={owned ? "messageRowRight" : "messageRow"}>
      {!owned && <Avatar alt={displayName} src={photoURL}></Avatar>}
      <div>
        <div className={owned ? "message right" : "message left"}>
          <div className={"messageTimeStampRight"}>{timeStamp(timeDiff)}</div>
          <div className="textContainer">
            <p className={"messageContent"}>{message}</p>
          </div>
        </div>
      </div>
      {/* {owned && <Avatar alt={displayName} src={photoURL}></Avatar>} */}
    </div>
  );
}
