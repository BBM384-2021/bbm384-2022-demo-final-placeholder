import React, { useState, useEffect } from "react";
import BasicModal from "../commons/BasicModal";
import { TextField, Box, Alert, LinearProgress } from "@mui/material";
import { deleteUser } from "../../services/UserService";

const defaultInputValues = {
  csMail: "",
  password: "",
};

const DeleteProfileModal = ({ open, setOpen, user }) => {
  const [values, setValues] = useState(defaultInputValues);
  const [error, setError] = useState(``);
  const [isWaitResponse, setIsWaitResponse] = useState(false);

  const onClose = () => {
    setError(``);
    setOpen(false);
  };

  const modalStyles = {
    inputFields: {
      display: "flex",
      flexDirection: "column",
      marginTop: "20px",
      marginBottom: "15px",
      ".MuiFormControl-root": {
        marginBottom: "20px",
      },
    },
  };

  const handleChange = (value) => {
    setValues(value);
  };

  useEffect(() => {
    if (open) setValues(defaultInputValues);
  }, [open]);

  const handleSubmit = () => {
    if (isWaitResponse) {
      return;
    }

    setIsWaitResponse(true);
    setError(``);
    deleteUser(user.id, values.csMail, values.password)
      .then((response) => {
        console.log(response);
        if (response.data.code === 200) {
          setOpen(false);
          setError(``);
          localStorage.setItem("user", null);
          window.location.replace("/");
        } else {
          setError("Please Check Your Data");
        }
        setIsWaitResponse(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getContent = () => (
    <Box sx={modalStyles.inputFields}>
      {error && (
        <Alert severity="error" sx={{ marginBottom: "15px" }}>
          {error}
        </Alert>
      )}
      <TextField
        placeholder="CS Mail"
        name="csMail"
        label="Mail"
        error={error.length > 0}
        value={values.csMail}
        onChange={(event) =>
          handleChange({ ...values, csMail: event.target.value })
        }
      />
      <TextField
        placeholder="Password"
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        error={error.length > 0}
        value={values.password}
        onChange={(event) =>
          handleChange({ ...values, password: event.target.value })
        }
      />
      {isWaitResponse && (
        <>
          <p>We shall meet again!</p>
          <LinearProgress />
        </>
      )}
    </Box>
  );

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title="Delete Profile"
      subTitle="Fill out your info and hit 'save' button."
      content={getContent()}
      onSubmit={handleSubmit}
    />
  );
};

export default DeleteProfileModal;
