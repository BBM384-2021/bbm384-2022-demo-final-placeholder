import React from "react";
import Avatar from "@mui/material/Avatar";

import { Colors } from "../../Colors";
import { convertMs2TimeString as timeStamp } from "../commons/Comment";


import defaultProfilePic from "../../img/defaultProfilePic.png";
import "./Chat.css";

export const MessageLeft = (props) => {
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";
  const photoURL = props.photoURL ? props.photoURL : defaultProfilePic;
  const displayName = props.displayName ? props.displayName : "display name";

  return (
    <>
      <div className={"messageRow"}>
        <Avatar alt={displayName} className={"orange"} src={photoURL}></Avatar>
        <div>
          <div className={displayName}>{displayName}</div>
          <div className={"messageBlue"}>
            <div>
              <p className={"messageContent"}>{message}</p>
            </div>
            <div className={"messageTimeStampRight"}>{timestamp}</div>
          </div>
        </div>
      </div>
    </>
  );
};
//avatar
export const MessageRight = (props) => {
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";
  return (
    <div className={"messageRowRight"}>
      <div className={"messageOrange"}>
        <p className={"messageContent"}>{message}</p>
        <div className={"messageTimeStampRight"}>{timestamp}</div>
      </div>
    </div>
  );
};
