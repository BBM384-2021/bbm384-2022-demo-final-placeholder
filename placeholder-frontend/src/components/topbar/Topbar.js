import {React} from "react";
import { useNavigate } from "react-router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import Badge from "@mui/material/Badge";
import AccountCircle from "@mui/icons-material/AccountCircle";

import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { SvgIcon } from "@mui/material";

import { ReactComponent as LinkedHuIcon } from "../../linhu_logo.svg";

import SearchBar from "../search-bar/SearchBar";

export default function TopBar(props) {
  const { userObj } = props;
  const history = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
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
            <IconButton
              size="large"
              aria-label="mails"
              sx={{ backgroundColor: "#F5F5F5" }}
            >
              <Badge badgeContent={1} color="error">
                <MailIcon />
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
                <PersonOutlineIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              sx={{ backgroundColor: "#F5F5F5" }}
            >
              <Badge badgeContent={5} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" sx={{ backgroundColor: "#F5F5F5" }}>
              <SettingsIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={() => {
                console.log(history);
                history("/in/" + userObj.id);
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
