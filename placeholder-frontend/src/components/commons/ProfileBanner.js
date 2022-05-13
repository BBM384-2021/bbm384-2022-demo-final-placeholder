import React from "react";
import { useNavigate } from "react-router";
import { Box } from "@mui/material";
import profilePic from "../profilepage-screen/assets/1post.png";
import calenderPic from "../../img/calendar.png";
import { Colors } from "../../Colors";
import "./ProfileBanner.css";

export default function ProfileBanner({
  withoutName = false,
  contentType,
  user,
  status,
  handleChatOpen,
}) {
  const navigate = useNavigate();
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
    case "chat":
      contentEnum = 4;
      break;

    default:
      //search bar banners
      // chat banner
      contentEnum = 5;
      break;
  }

  const profilePicPath = user.profile_pic_path
    ? user.profile_pic_path
    : profilePic;

  function handleProfileBannerClick(user) {
    if (contentEnum === 4) {
      return handleChatOpen(user.id);
    }
    console.log("Navigation");
    return navigate(`/in/${user.id}`);
  }

  return (
    <Box
      className={"profileBanner " + styleClassName}
      component={"button"}
      onClick={() => handleProfileBannerClick(user)}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            margin: "0px 20px 10px 5px",
            height: "50px",
            width: "50px",
            // marginRight: "20px",
          }}
        >
          <img
            className="profileBanner---profilePic"
            src={profilePicPath}
            alt=""
            style={{ height: "100%", width: "100%" }}
          />
        </div>
        <div className="bannerInfoContainer">
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
