import React, { useEffect, useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Box,
  CircularProgress,
  Typography,
  Backdrop,
} from "@mui/material";
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
  const open = Boolean(anchorEl);

  const [state, setState] = useState({
    isLoading: false,
    value: 0,
    profilePic: user.profile_pic_path
      ? user.profile_pic_path
      : defaultProfilePic,
    coverPic: user.cover_url ? user.cover_url : defaultCover,
  });

  useEffect(() => {
    if (!state.isLoading) setEdited(true);
  }, [state.isLoading, setEdited]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePP = (selectedFile) => {
    uploadPicture(selectedFile, "profilePic", user, setState, state);
  };

  const handleChangeCover = (selectedFile) => {
    uploadPicture(selectedFile, "coverUrl", user, setState, state);
  };

  return (
    <div
      className="headerContainer"
      style={{
        backgroundImage: `url(${state.coverPic})`,
      }}
    >
      <div className="ppContainer">
        <div className="profileImage">
          <img src={state.profilePic} alt="Profile of User" />
          {profileOwned && (
            <FileUploader
              class="editPPButton"
              setUploadedFile={handleChangePP}
            ></FileUploader>
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
          <FileUploader
            class="editCoverButton"
            setUploadedFile={handleChangeCover}
          ></FileUploader>
          // <IconButton
          //   className="editCoverButton"
          //   color="primary"
          //   aria-label="upload picture"
          //   component="span"
          //   onClick={handleChangeCover}
          // >
          //   <CameraAlt style={{ color: "#F5F5F5" }} fontSize="large" />
          // </IconButton>
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

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={state.isLoading}
        onClick={handleClose}
      >
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            color="inherit"
            thickness={4}
            variant="determinate"
            value={state.value}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="caption" component="div" color="text.primary">
              {`${Math.round(state.value)}%`}
            </Typography>
          </Box>
        </Box>
      </Backdrop>
    </div>
  );
}
