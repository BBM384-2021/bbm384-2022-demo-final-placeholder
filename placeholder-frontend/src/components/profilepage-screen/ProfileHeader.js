import React, { useState } from "react";
import S3FileUpload from "react-s3";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { CameraAlt, MoreHoriz } from "@mui/icons-material";

import { getS3Info } from "../../services/S3Service";

import defaultCover from "../../img/defaultProfileCover.png";
import defaultProfilePic from "../../img/defaultProfilePic.png";

import "./Profile.css";
import FileUploader from "../commons/FileUploader";

export default function ProfileHeader({ profileOwned, sessionUser, user }) {
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
    setProfilePic(selectedFile);
    // TODO updateUser();
  };

  // const handleChangePP = (file) => {
  //   // Bucket Details: S3
  //   const config = {
  //     bucketName: getS3Info.S3_BUCKET,
  //     dirName: getS3Info.folder_name, //it’s optional
  //     region: getS3Info.S3_REGION,
  //     accessKeyId: getS3Info.S3_KEY_ID,
  //     secretAccessKey: getS3Info.S3_SECRET_KEY,
  //   };

  //   // then upload the file
  //   S3FileUpload.uploadFile(file, config)
  //     .then((data) => {
  //       console.log(data.location); // it return the file url
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // };
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
            <FileUploader setUploadedFile={setProfilePic}></FileUploader>
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
