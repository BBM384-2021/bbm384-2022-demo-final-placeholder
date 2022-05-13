import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  AppBar,
  Avatar,
  Tooltip,
  Box,
  Toolbar,
  IconButton,
  Badge,
  SvgIcon,
  Menu,
  Divider,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

import { Settings, PersonOutline, Logout, Group } from "@mui/icons-material";

import ConfirmationDialog from "../commons/ConfirmationDialog";
import SearchBar from "../search-bar/SearchBar";
import TagManagementBox from "../tag-management/TagManagementBox";
import EditProfileModal from "../profilepage-screen/EditProfileModal";

import { ReactComponent as LinkedHuIcon } from "../../linhu_logo.svg";
import ConnectionsModal from "../profilepage-screen/ConnectionsModal";
import { getAllUsers } from "../../services/UserService";

export default function TopBar({ userObj, setUser }) {
  const history = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [tagManOpen, setTagManOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const openUserMenu = Boolean(anchorEl);
  const [allUsers, setAllUsers] = useState([]);
  const [allUsersModal, setAllUsersModal] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateToProfile = () => {
    history("/in/" + userObj.id);
  };

  const handleLogout = () => {
    localStorage.setItem("user", null);
    setUser(null);
    history("/");
  };

  const askConfirmation = () => {
    setConfirmationOpen(true);
  };

  return (
    <React.Fragment>
      <Box>
        <AppBar
          position="static"
          sx={{ bgcolor: "white", borderRadius: "20px" }}
          elevation={0}
        >
          <Toolbar sx={{ height: "90px" }}>
            <a href="/">
              <SvgIcon
                component={LinkedHuIcon}
                inheritViewBox
                sx={{
                  width: "199.62px",
                  height: "50.64px",
                  marginLeft: "40px",
                  marginRight: "54.38px",
                }}
              />
            </a>
            <SearchBar />
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              {/* <Tooltip title="Connection Requests">
                <IconButton
                  aria-label="connections req"
                  sx={{ backgroundColor: "#F5F5F5" }}
                >
                  <Badge
                    badgeContent={1}
                    color="error"
                    sx={{ fontFamily: "Poppins", fontWeight: 700 }}
                  >
                    <PersonOutline />
                  </Badge>
                </IconButton>
              </Tooltip> */}

              {/* <IconButton
                size="large"
                aria-label="show 17 new notifications"
                sx={{ backgroundColor: "#F5F5F5" }}
              >
                <Badge badgeContent={5} color="error">
                  <Notifications />
                </Badge>
              </IconButton> */}
              {/* <IconButton size="large" sx={{ backgroundColor: "#F5F5F5" }}>
                <Settings />
              </IconButton> */}
              {parseInt(userObj.user_type) === 0 && (
                <Tooltip title="List All Users">
                  <IconButton
                    onClick={() => {
                      getAllUsers().then((response) => {
                        console.log("response: ", response);
                        if (response.data.code === 200) {
                          setAllUsers(response.data.allUsers);
                          setAllUsersModal(true);
                        }
                      });
                    }}
                    sx={{ mr: 2 }}
                    aria-controls={openUserMenu ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openUserMenu ? "true" : undefined}
                  >
                    <Group />
                  </IconButton>
                </Tooltip>
              )}

              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  sx={{ mr: 2 }}
                  aria-controls={openUserMenu ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openUserMenu ? "true" : undefined}
                >
                  <Avatar
                    size="large"
                    src={userObj.profile_pic_path}
                    // sx={{ width: 32, height: 32 }}
                  >
                    {userObj.full_name.charAt(0)}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openUserMenu}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={navigateToProfile}>
          <Avatar src={userObj.profile_pic_path} /> View Profile
        </MenuItem>
        <MenuItem onClick={() => setEditProfileOpen(true)}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Edit Profile
        </MenuItem>
        <Divider />
        {parseInt(userObj.user_type) === 0 && ( // if admin is using the system
          <MenuItem onClick={() => setTagManOpen(true)}>
            <LocalOfferIcon sx={{ marginRight: "10px" }} />
            Manage Tags
          </MenuItem>
        )}
        {parseInt(userObj.user_type) === 0 && <Divider />}
        <MenuItem onClick={askConfirmation}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <ConfirmationDialog
        onConfirm={handleLogout}
        open={confirmationOpen}
        setOpen={setConfirmationOpen}
      >
        Are you sure you want to logout?
      </ConfirmationDialog>

      {userObj.user_type == 0 && (
        <TagManagementBox open={tagManOpen} setOpen={setTagManOpen} />
      )}
      {editProfileOpen && (
        <EditProfileModal
          open={editProfileOpen}
          setOpen={setEditProfileOpen}
          user={userObj}
        ></EditProfileModal>
      )}
      {ConnectionsModal && (
        <ConnectionsModal
          open={allUsersModal}
          setOpen={setAllUsersModal}
          connections={allUsers}
          title="All System Users"
        ></ConnectionsModal>
      )}
    </React.Fragment>
  );
}
