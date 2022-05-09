import React, { useState } from "react";
import PropTypes from "prop-types";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  ArrowBack,
  PersonOutlined,
  MailOutlined,
  LockOutlined,
} from "@mui/icons-material";
import {
  Button,
  CssBaseline,
  FormControlLabel,
  Link,
  Radio,
  RadioGroup,
  Box,
  Typography,
  Container,
  Alert,
  Card,
} from "@mui/material";

import IconTextField from "../commons/IconTextField";

import { Colors } from "../../Colors";
import "./Welcome.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://github.com/BBM384-2021/bbm384-2022-demo-final-placeholder"
      >
        Placeholder Team
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

//in case we need a dark theme in the future
const theme = createTheme();

export default function Register({ setLogin, setUser }) {
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({ cs_mail: "", user_password: "" });

  const validate = (fieldValues) => {
    if (fieldValues.get("user_password")?.length < 6) {
      setError("Minimum 6 characters required.");
      return false;
    } else if (
      fieldValues.get("user_password") !== fieldValues.get("confirm_password")
    ) {
      setError("Please Confirm Password!");
      return false;
    }
    return true;
  };
  // const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
  //   useForm(initialFValues, true, validate);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setUserData({
      full_name: data.get("full_name"),
      user_type: data.get("user_type") === "student" ? 3 : 4,
      cs_mail: data.get("cs_mail"),
      user_password: data.get("user_password"),
      // student: 3 , graduate: 4
    });
    if (validate(data)) {
      console.log("Register Validation TODO: ", userData);
    }
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     type: data.get("user-type"),
  //     password: data.get("password"),
  //     confpassword: data.get("confirm-password"),
  //   });
  // };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Card className="card-view">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3 className="welcome">Join Us!</h3>
            {error && <Alert severity="error">{error}</Alert>}
            <Box
              component="form"
              noValidate
              handleSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <RadioGroup
                row
                aria-labelledby="user-type"
                name="user-type"
                className="radio-container"
              >
                <FormControlLabel
                  className="radio"
                  value="student"
                  control={
                    <Radio
                      className="Radio"
                      sx={{
                        "&, &.Mui-checked": {
                          color: Colors.hacettepe,
                        },
                      }}
                    />
                  }
                  label="Student"
                />
                <FormControlLabel
                  className="radio"
                  value="graduate"
                  control={
                    <Radio
                      className="Radio"
                      sx={{
                        "&, &.Mui-checked": {
                          color: Colors.hacettepe,
                        },
                      }}
                    />
                  }
                  label="Graduate"
                />
              </RadioGroup>
              <IconTextField
                className="TextField"
                margin="normal"
                required
                fullWidth
                id="full_name"
                label="Name Surname"
                name="full_name"
                autoComplete="name"
                autoFocus
                iconEnd={<PersonOutlined />}
              />
              <IconTextField
                className="TextField"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                iconEnd={<MailOutlined />}
              />
              <IconTextField
                className="TextField"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                iconEnd={<LockOutlined />}
              />
              <IconTextField
                className="TextField"
                margin="normal"
                required
                fullWidth
                name="confirm-password"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                autoComplete="current-password"
                iconEnd={<LockOutlined />}
              />
              <Box display="flex" justifyContent="space-between">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: Colors.hacettepe,
                    ":hover": {
                      background: Colors.whiteShaded,
                      color: "#000",
                    },
                    mt: 3,
                    mb: 2,
                    width: "40%",
                  }}
                >
                  Register
                </Button>
                <button
                  onClick={() => {
                    setLogin(true);
                  }}
                  type="button"
                  className="passive"
                >
                  <span className="back-arrow">
                    <ArrowBack />
                  </span>
                  <span>Go back</span>
                </button>
              </Box>
            </Box>
          </Box>
          <Copyright sx={{ mt: 4, mb: 4 }} />
        </Card>
      </Container>
    </ThemeProvider>
  );
}

Register.propTypes = {
  setLogin: PropTypes.func,
};
