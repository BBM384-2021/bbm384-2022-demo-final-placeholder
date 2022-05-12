import React, { useState, useEffect } from "react";
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
import { createUser } from "../../services/UserService";

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
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({});
  const [isSubmitted, setSubmitted] = useState(false);

  useEffect(() => {
    console.log(userData);
    if (isSubmitted) {
      createUser(userData).then((response) => {
        if (response.data.code === 200) {
          setUser(response.data.user);
        } else {
          setErrors({ ...errors, server: response.data.error });
        }
      });
    }
  }, [userData]);

  const validate = (fieldValues) => {
    let temp = {};
    if (!fieldValues.get("user_type")) {
      console.log("user_type");
      temp["userType"] = "Select a User Type to Register";
    } else {
      delete temp["userType"];
    }

    if (fieldValues.get("password")?.length < 6) {
      temp["password"] = "Minimum 6 Characters Required in Passwords.";
    } else if (
      fieldValues.get("password") !== fieldValues.get("confirm_password")
    ) {
      delete temp["password"];
      temp["confirm_password"] = "Passwords Do NOT Match!";
    } else {
      delete temp["confirm_password"];
    }
    setErrors({ ...temp });
    // will return true if temp is empty else validation fails
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (validate(data)) {
      console.log("Register Validated");
      setSubmitted(true);
      setUserData({
        full_name: data.get("full_name"),
        // student: 3 , graduate: 4
        user_type: data.get("user_type")
          ? data.get("user_type") === "student"
            ? 3
            : 4
          : undefined,
        cs_mail: data.get("cs_mail"),
        user_password: data.get("password"),
        confirm_password: data.get("confirm_password"),
      });
    }
  };

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
            {Object.values(errors).map((error, index) => (
              <Alert key={index} severity="error">
                {error}
              </Alert>
            ))}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <RadioGroup
                row
                aria-labelledby="user_type"
                name="user_type"
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
                // autoFocus
                iconEnd={<PersonOutlined />}
              />
              <IconTextField
                className="TextField"
                margin="normal"
                required
                fullWidth
                id="cs_mail"
                label="Email Address"
                name="cs_mail"
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
                iconEnd={<LockOutlined />}
              />
              <IconTextField
                className="TextField"
                margin="normal"
                required
                fullWidth
                name="confirm_password"
                label="Confirm Password"
                type="password"
                id="confirm_password"
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
