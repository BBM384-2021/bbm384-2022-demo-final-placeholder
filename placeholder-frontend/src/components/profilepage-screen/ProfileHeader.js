import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { CameraAlt, MoreHoriz } from "@mui/icons-material";

import defaultCover from "../../img/defaultProfileCover.png";
import defaultProfilePic from "../../img/defaultProfilePic.png";

import "./Profile.css";

export default function ProfileHeader({
  cover,
  profilePic,
  profileOwned,
  sessionUser,
  user,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const profilePicPath = user.profile_pic_path
    ? user.profile_pic_path
    : defaultProfilePic;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePP = () => {
    console.log(JSON.parse(sessionUser.user_type) < 2);
  };
  const handleChangeCover = () => {
    console.log("change cover pp");
  };

  return (
    <div
      className="headerContainer"
      style={{
        backgroundImage: `url(${cover ? cover : defaultCover})`,
      }}
    >
      <div className="ppContainer">
        <div className="profileImage">
          <img src={profilePicPath} alt="Profile of User" />
          {profileOwned && (
            <IconButton
              className="editPPButton"
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={handleChangePP}
            >
              <CameraAlt style={{ color: "#A5A5A5" }} />
            </IconButton>
          )}
        </div>
      </div>
      <div className="optionsContainer">
        {/* if the user is an admin or an instructor, we show the more button */}
        {/* if user is on their own profile, we only show Edit Profile option under More button */}
        {!profileOwned && JSON.parse(sessionUser.user_type) < 2 && (
          <IconButton
            className="moreButton"
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={handleClick}
          >
            <MoreHoriz style={{ color: "#F5F5F5" }} fontSize="large" />
          </IconButton>
        )}
        {profileOwned && (
          <IconButton
            className="editCoverButton"
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={handleChangeCover}
          >
            <CameraAlt style={{ color: "#F5F5F5" }} fontSize="large" />
          </IconButton>
        )}
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* if user is looking at their own profile, nothing shows */}
        {/* if user is admin or intructor, student admin edit appears */}
        {/* if user is admin instructor edit adds to list */}
        {!profileOwned &&
          JSON.parse(sessionUser.user_type) < 2 &&
          JSON.parse(user.user_type) !== 2 && (
            <MenuItem onClick={handleClose}>
              Set as Student Administrative
            </MenuItem>
          )}
        {!profileOwned &&
          sessionUser.user_type < 2 &&
          JSON.parse(user.user_type) === 2 && (
            <MenuItem onClick={handleClose}>
              Remove Student Administrative Role
            </MenuItem>
          )}
        {!profileOwned &&
          sessionUser.user_type < 1 &&
          JSON.parse(user.user_type) !== 1 && (
            <MenuItem onClick={handleClose}>Set as Instructor</MenuItem>
          )}
        {!profileOwned &&
          sessionUser.user_type < 1 &&
          JSON.parse(user.user_type) === 1 && (
            <MenuItem onClick={handleClose}> Remove Instructor Role </MenuItem>
          )}
      </Menu>
    </div>
  );
}
