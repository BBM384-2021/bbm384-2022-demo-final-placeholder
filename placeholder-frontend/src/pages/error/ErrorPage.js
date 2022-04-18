import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import { Colors } from "../../Colors";

import "./ErrorPage.css";

export default function ErrorPage() {
  let navigate = useNavigate();
  const handleRouteChange = () => {
    let path = `/`;
    navigate(path);
  };

  return (
    <div className="container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>
        The page that you are looking for doesn't exist or another error
        occurred.
      </p>
      <Button
        className="Button"
        onClick={handleRouteChange}
        sx={{
          backgroundColor: Colors.hacettepe,
          color: Colors.white,
          borderRadius: "20px",
          margin: "10px 20px",
          ":hover": { backgroundColor: Colors.white, color: Colors.black },
        }}
      >
        Take Me Home!
      </Button>
    </div>
  );
}
