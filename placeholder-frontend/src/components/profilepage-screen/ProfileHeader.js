import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { CameraAlt, MoreHoriz } from "@mui/icons-material";

import { updateUser } from "../../services/UserService";
import { uploadPicture } from "../../services/S3Service";
import FileUploader from "../commons/FileUploader";

import defaultCover from "../../img/defaultProfileCover.png";
import defaultProfilePic from "../../img/defaultProfilePic.png";
import "./Profile.css";

export default function ProfileHeader({
  profileOwned,
  sessionUser,
  user,
  setEdited,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profilePic, setProfilePic] = useState(
    user.profile_pic_path ? user.profile_pic_path : defaultProfilePic
  );
  const [coverPic, setCoverPic] = useState(
    user.cover_url ? user.cover_url : defaultCover
  );
  // const [state, setState] = useState({
  //   mainState: "initial", //initial, uploaded
  //   selectedFile: null,
  //   imageUploaded: 0,
  // });

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePP = (selectedFile) => {
    console.log("profile file: ", selectedFile);
    uploadPicture(selectedFile, "profile-pics", setEdited);
  };

  const handleChangeCover = () => {
    // TODO
  };

  return (
    <div
      className="headerContainer"
      style={{
        backgroundImage: `url(${coverPic})`,
      }}
    >
      <div className="ppContainer">
        <div className="profileImage">
          <img src={profilePic} alt="Profile of User" />
          {profileOwned && (
            <FileUploader setUploadedFile={handleChangePP}></FileUploader>
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
