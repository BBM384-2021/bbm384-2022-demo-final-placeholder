import * as React from "react";

import { AppBar, Box, Toolbar, IconButton } from "@mui/material";

import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

import {
  Mail,
  Logout,
  Notifications,
  MoreVert,
  PersonOutline,
} from "@mui/icons-material";
import { SvgIcon } from "@mui/material";

import { ReactComponent as LinkedHuIcon } from "../../linhu_logo.svg";

import SearchBar from "../commons/SearchBar";

export default function TopBar({ userObj, setUser }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";

  const handleLogout = () => {
    console.log("logout success!");
    localStorage.removeItem("session");
    setUser(null);
    window.location.reload();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ bgcolor: "white", borderRadius: "20px" }}
        elevation={0}
      >
        <Toolbar sx={{ height: "90px" }}>
          <a href="/mainPage">
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
            <IconButton
              size="large"
              aria-label="mails"
              sx={{ backgroundColor: "#F5F5F5" }}
            >
              <Badge badgeContent={1} color="error">
                <Mail />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
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

            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              sx={{ backgroundColor: "#F5F5F5" }}
            >
              <Badge badgeContent={5} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              onClick={handleLogout}
              sx={{ backgroundColor: "#F5F5F5" }}
            >
              <Logout />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={() => {
                window.open("/in/" + userObj.id, "_blank");
              }}
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
