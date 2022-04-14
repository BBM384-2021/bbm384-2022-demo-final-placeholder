import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from 'prop-types';

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
import "./Login.css";
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

const theme = createTheme();

export default function Login({setLogin}) {
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
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
            <h3 className="welcome">
              Welcome
            </h3>
            {error && <Alert severity="error">{error}</Alert>}

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Box display="flex" justifyContent="space-between">
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  variant="contained"
                  sx={{
                    backgroundColor: Colors.red,
                    mt: 3,
                    mb: 2,
                    width: "40%",
                  }}
                >
                  Login
                </Button>
                <button onClick={()=>{setLogin(false)}} type="submit" className="passive">
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
  setLogin : PropTypes.func,
};
