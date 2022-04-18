import { SvgIcon, Card } from "@mui/material";
import React, { useState } from "react";

import Login from "../components/welcome-screen/Login";
import Register from "../components/welcome-screen/Register";

import { ReactComponent as LinkedHuIcon } from "../img/linhu_logo.svg";
import "./WelcomeScreen.css";


export default function WelcomeScreen({ setUser }) {

  const [login, setLogin] = useState(true);

  return (
    <div className="welcome-container">
      <Card className="card-container">
        <SvgIcon
          component={LinkedHuIcon}
          inheritViewBox
          sx={{
            width: "199.62px",
            height: "50.64px",
            marginLeft: "40px",
            marginRight: "54.38px",
            marginBottom: "60px",
          }}
        />
        {login ? (
          <Login setLogin={setLogin} setUser={setUser} />
        ) : (
          <Register setLogin={setLogin} setUser={setUser} />
        )}
      </Card>
    </div>
  );
}
