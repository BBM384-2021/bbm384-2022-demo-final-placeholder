import React from "react";
import { useNavigate } from "react-router";
import { Box } from "@mui/material";
import profilePic from "../profilepage-screen/assets/1post.png";
import calenderPic from "../../img/calendar.png";
import { Colors } from "../../Colors";
import "./ProfileBanner.css";

function handleProfileBannerClick(user, history) {
  return () => {
    // const user_prof_id = user.cs_mail.split('@')[0]
    // window.open("/in/" + user.id, "_blank");
    history(`/in/${user.id}`);
  };
}

export default function ProfileBanner({
  withoutName = false,
  contentType,
  user,
  status,
}) {
  const history = useNavigate();
  const styleClassName = "profileBanner-" + contentType;
  const withStatus = status === undefined ? false : true;
  let contentEnum = 0;
  switch (contentType) {
    case "post":
      contentEnum = 0;
      break;
    case "event":
      contentEnum = 1;
      break;
    case "comment":
      contentEnum = 2;
      break;
    case "connection":
      contentEnum = 3;
      break;

    default:
      //search bar banners
      contentEnum = 4;
      break;
  }

  const profilePicPath = user.profile_pic_path
    ? user.profile_pic_path
    : profilePic;
  return (
    <Box
      className={"profileBanner " + styleClassName}
      component={"button"}
      onClick={handleProfileBannerClick(user, history)}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          className="profileBanner---profilePic"
          src={profilePicPath}
          alt=""
          style={{ margin: "0px 10px 0px 5px" }}
        />
        <div>
          {!withoutName && (
            <p style={{ margin: "0px", wordWrap: "normal" }}>
              <strong> {user.full_name} </strong>
              {contentEnum < 2 &&
                (contentEnum === 0 ? "shared a post" : "shared an event")}
            </p>
          )}

          {withStatus && <span>{status}</span>}
        </div>
      </div>

      {contentEnum === 1 && (
        <img className="pBanner---calender" src={calenderPic} alt="calender" />
      )}
    </Box>
  );
}
