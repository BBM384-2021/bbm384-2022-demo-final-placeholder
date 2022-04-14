import { Icon } from "@mui/material";
import React, { useState } from "react";
import Login from "../components/welcome-screen/Login";
import Register from "../components/welcome-screen/Register";
import logo from "../logo.svg";

export default function WelcomeScreen() {
  const [login, setLogin] = useState(true);

  return (
    <div>
      <div>RESIM</div>
      {login ? <Login setLogin={setLogin} /> : <Register setLogin={setLogin} />}
    </div>
  );
}
