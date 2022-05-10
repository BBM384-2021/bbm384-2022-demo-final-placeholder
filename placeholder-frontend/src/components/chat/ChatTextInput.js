import React from "react";
import { TextField, Button } from "@mui/material";
import { Send } from "@mui/icons-material";

import "./Chat.css";

export const ChatTextInput = () => {
  return (
    <>
      <form className={"wrapForm"} noValidate autoComplete="off">
        <TextField
          id="standard-text"
          label="text-input"
          className={"wrapText"}
          //margin="normal"
        />
        <Button variant="contained" color="primary" className={"button"}>
          <Send />
        </Button>
      </form>
    </>
  );
};
