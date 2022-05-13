import React, { useEffect, useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { CameraAlt, MoreHoriz } from "@mui/icons-material";

import { uploadPicture } from "../../services/S3Service";
import { getUser, updateUser } from "../../services/UserService";
import FileUploader from "../commons/FileUploader";

import defaultCover from "../../img/defaultProfileCover.png";
import defaultProfilePic from "../../img/defaultProfilePic.png";
import "./Profile.css";
import ConfirmationDialog from "../commons/ConfirmationDialog";
import { deleteUser } from "../../services/UserService";

export default function ProfileHeader({
  profileOwned,
  sessionUser,
  user,
  setUser,
  setEdited,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isRoleChange, setRoleChange] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const [state, setState] = useState({
    isLoading: false,
    value: 0,
    profilePic: user.profile_pic_path
      ? user.profile_pic_path
      : defaultProfilePic,
    coverPic: user.cover_url ? user.cover_url : defaultCover,
  });

  useEffect(() => {
    getUser(user.id).then((response) => {
      if (response.data.code === 200) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    });
    setRoleChange(false);
  }, [isRoleChange]);

  useEffect(() => {
    if (!state.isLoading) setEdited(true);
    setState({
      ...state,
      profilePic: user.profile_pic_path
        ? user.profile_pic_path
        : defaultProfilePic,
      coverPic: user.cover_url ? user.cover_url : defaultCover,
    });
  }, [state.isLoading, setEdited, user]);

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

  const setStudentRep = () => {
    updateUser({ user: user, values: { userType: 2 } }).then((response) => {
      if (response.data.code === 200) {
        setRoleChange(true);
      }
    });
  };
  const removeStudentRep = () => {
    updateUser({ user: user, values: { userType: 3 } }).then((response) => {
      if (response.data.code === 200) {
        setRoleChange(true);
      }
    });
  };
  const setInstructor = () => {
    updateUser({ user: user, values: { userType: 1 } }).then((response) => {
      if (response.data.code === 200) {
        setRoleChange(true);
      }
    });
  };
  const removeInstructor = () => {
    updateUser({ user: user, values: { userType: 3 } }).then((response) => {
      if (response.data.code === 200) {
        setRoleChange(true);
      }
    });
  };

  const adminDeleteUser = () => {
    deleteUser(user.id, user.cs_mail, "", 0).then((response) => {
      if (response.data.code === 200) {
        alert("User is Deleted");
      }
    });
  };

  return (
    <div
      className="headerContainer"
      style={{
        backgroundImage: `url(${state.coverPic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="ppContainer">
        <div className="profileImage">
          <img src={state.profilePic} alt="Profile of User" />
          {profileOwned && (
            <FileUploader
              class="editPPButton"
              setUploadedFile={handleChangePP}
              state={state}
            >
              <CameraAlt className="altIcon" style={{ color: "#F5F5F5" }} />
            </FileUploader>
          )}
        </div>
      </div>
      <div className="optionsContainer">
        {/* if the user is an admin or an instructor, we show the more button */}
        {/* if user is on their own profile, we only show Edit Profile option under More button */}
        {!profileOwned && parseInt(sessionUser.user_type) < 2 && (
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
            state={state}
          >
            <CameraAlt className="altIcon" style={{ color: "#F5F5F5" }} />
          </FileUploader>
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
          parseInt(sessionUser.user_type) < 2 &&
          parseInt(user.user_type) !== 2 && (
            <MenuItem onClick={setStudentRep}>
              Set as Student Representative
            </MenuItem>
          )}
        {!profileOwned &&
          sessionUser.user_type < 2 &&
          parseInt(user.user_type) === 2 && (
            <MenuItem onClick={removeStudentRep}>
              Remove Student Representative Role
            </MenuItem>
          )}
        {!profileOwned &&
          sessionUser.user_type < 1 &&
          parseInt(user.user_type) !== 1 && (
            <MenuItem onClick={setInstructor}>Set as Instructor</MenuItem>
          )}
        {!profileOwned &&
          sessionUser.user_type < 1 &&
          parseInt(user.user_type) === 1 && (
            <MenuItem onClick={removeInstructor}>
              Remove Instructor Role
            </MenuItem>
          )}
        {!profileOwned && sessionUser.user_type < 1 && (
          <MenuItem
            onClick={() => {
              setDeleteConfirmation(true);
            }}
          >
            Delete User
          </MenuItem>
        )}
      </Menu>
      <ConfirmationDialog
        open={deleteConfirmation}
        setOpen={setDeleteConfirmation}
        onConfirm={adminDeleteUser}
      >
        This user will be deleted permanently
      </ConfirmationDialog>
    </div>
  );
}
