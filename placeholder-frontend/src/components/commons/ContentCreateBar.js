import { Box } from "@mui/material";
import React from "react";
import { Colors } from "../../Colors";
import "./contentCreateBar.css";

export default function ContentCreateBar({ children, onClick }) {
  return (
    <div className="content-create-box" onClick={onClick}>
      <span style={{ fontWeight: 400, color: Colors.whiteShadow }}>
        {children}{" "}
      </span>
    </div>
  );
}
