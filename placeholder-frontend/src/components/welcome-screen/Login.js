import React, { useState } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";

import { MailOutlined, LockOutlined } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Button,
  CssBaseline,
  Card,
  Link,
  Box,
  Typography,
  Container,
  Alert,
  CircularProgress,
} from "@mui/material";

import IconTextField from "../commons/IconTextField";

import "./Welcome.css";
import { Colors } from "../../Colors";

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
const BaseLoginURL = "https://placeholder-backend.herokuapp.com/user/login";

export default function Login({ setLogin, setUser }) {
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({ cs_mail: "", user_password: "" });
  const [isLoading, setLoading] = useState(false);

  const validate = (fieldValues) => {
    console.log("user_password" in fieldValues);
    if (fieldValues.get("user_password")?.length < 6) {
      setError("Check your password!");
      return false;
    }
    return true;
  };
  // const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
  //   useForm(initialFValues, true, validate);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("loading...", event);
    const data = new FormData(event.currentTarget);
    console.log({
      cs_mail: data.get("cs_mail"),
      user_password: data.get("user_password"),
    });
    if (validate(data)) {
      console.log("login success");

      axios
        .get(
          BaseLoginURL,
          {
            params: {
              cs_mail: data.get("cs_mail"),
              user_password: data.get("user_password"),
            },
          },
          {
            headers: {
              Authorization: "Basic xxxxxxxxxxxxxxxxxxx",
              "Content-Type": "text/plain",
            },
          }
        )
        .then((response) => {
          console.log("response: ", response);

          if (response.data.code === 200) {
            // success
            const user = response.data.user;
            console.log(user);
            setUser(user);
          } else {
            setError("Wrong E-mail or Password!");
          }
        })
        .catch((error) => {
          console.log("error axios: ", error.response);
        });
    }
    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Card className="card-view">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3 className="welcome">Welcome</h3>
            {error && <Alert severity="error">{error}</Alert>}

            <Box
              component="form"
              onSubmit={(event) => {
                setLoading(true);
                handleSubmit(event);
              }}
              noValidate
              sx={{ mt: 1 }}
            >
              <IconTextField
                className="TextField"
                margin="normal"
                required
                fullWidth
                id="cs_mail"
                label="CS Mail"
                name="cs_mail"
                autoComplete="email"
                autoFocus
                iconEnd={<MailOutlined />}
              />
              <IconTextField
                className="TextField"
                margin="normal"
                required
                fullWidth
                name="user_password"
                label="Password"
                type="password"
                id="user_password"
                autoComplete="current-password"
                iconEnd={<LockOutlined />}
              />
              <Box display="flex" justifyContent="space-between">
                {isLoading ? (
                  <CircularProgress sx={{ mt: 3, mb: 2 }} color="inherit" />
                ) : (
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
                    Login
                  </Button>
                )}
                <button
                  onClick={() => {
                    setLogin(false);
                  }}
                  type="button"
                  className="passive"
                >
                  Register
                </button>
              </Box>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Card>
      </Container>
    </ThemeProvider>
  );
}

Login.propTypes = {
  setLogin: PropTypes.func,
};
