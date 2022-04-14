import { Icon } from "@mui/material";
import React, { useState } from "react";

import Login from "../components/welcome-screen/Login";
import Register from "../components/welcome-screen/Register";

import "./WelcomeScreen.css";

export default function WelcomeScreen() {
  const [login, setLogin] = useState(true);

  return (
    <div>
      <Icon className="iconRoot">
        <img
          className="imageIcon"
          src="public/linhu_logo.svg"
          alt="linkedhu logo"
        />
      </Icon>
      {login ? <Login setLogin={setLogin} /> : <Register setLogin={setLogin} />}
    </div>
  );
}
