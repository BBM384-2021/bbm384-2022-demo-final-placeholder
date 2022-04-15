import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";

import {
  Avatar,
  Button,
  CssBaseline,
  Card,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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

export default function Login({ setLogin }) {
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({ cs_mail: "", user_password: "" });

  const validate = (fieldValues) => {
    console.log("user_password" in fieldValues);
    if (fieldValues.get('user_password')?.length < 6) {
      setError("Check your password!");
      return false;
    }
    return true;
  };
  // const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
  //   useForm(initialFValues, true, validate);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    const data = new FormData(event.currentTarget);
    console.log({
      cs_mail: data.get("cs_mail"),
      user_password: data.get("user_password"),
    });
    console.log(error);
    if (validate(data)) {
      console.log('login success');
      // <Route to="/mainPage"/>
    }
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
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                className="TextField"
                margin="normal"
                required
                fullWidth
                id="cs_mail"
                label="CS Mail"
                name="cs_mail"
                autoComplete="email"
                autoFocus
              />
              <TextField
                className="TextField"
                margin="normal"
                required
                fullWidth
                name="user_password"
                label="Password"
                type="password"
                id="user_password"
                autoComplete="current-password"
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
                  Login
                </Button>
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
