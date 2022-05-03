import { Box } from "@mui/material";
import React from "react";
import profilePic from "../profilepage-screen/assets/1post.png";
import calenderPic from "../../img/calendar.png";
import { Colors } from "../../Colors";
import "./ProfileBanner.css";

export default function ProfileBanner({
  withoutName = false,
  withStatus = false,
  contentType,
  user,
  onClick,
}) {
  const contentEnum =
    contentType === "post" ? 0 : contentType === "event" ? 1 : 2;
  return (
    <Box className="profileBanner" component={"button"} onClick={onClick}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          className="profileBanner---profilePic"
          src={profilePic}
          alt=""
          style={{ margin: "0px 10px 0px 5px" }}
        />
        {!withoutName && (
          <p style={{ margin: "0px", wordWrap: "normal" }}>
            <strong> {user.full_name} </strong>
            {contentEnum < 2 &&
              (contentEnum === 0 ? "shared a post" : "shared an event")}
          </p>
        )}
      </div>

      {contentEnum === 1 && (
        <img className="pBanner---calender" src={calenderPic} alt="calender" />
      )}
      {withStatus && <span>April 15 2022, 13:40 pm</span>}
    </Box>
  );
}
