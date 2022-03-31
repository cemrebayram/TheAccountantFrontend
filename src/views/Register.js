import {
  Container,
  Stack,
  TextField,
  Grid,
  Typography,
  Button,
  Divider,
  Chip,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    confirmEmail: "",
    name: "",
  });
  const navigate = useNavigate();
  const register = () => {
    if (
      user.password != user.confirmPassword ||
      user.email != user.confirmEmail
    ) {
      alert("Passwords or emails do not match!");
    } else {
      fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.username) {
            alert("Successfully registered");
          } else {
            alert(data.message);
            navigate("/login");
          }
        });
    }
  };
  return (
    <Container>
      <br />
      <br />
      <br />
      <br />
      <Divider sx={{ margin: "30px 0" }}>
        <img width="50px" src="/../../userlogin.png"></img>
      </Divider>
      <Grid
        container
        borderRadius="3%"
        border="2px lightgrey solid"
        padding={2}
        mt={3}
      >
        <Grid container rowSpacing={3} mt={1}>
          <Grid item md={3} />
          <Grid item md={6} xs={12}>
            <center>
              <Typography variant="h5">Register</Typography>
            </center>
          </Grid>
          <Grid item md={3} />
          <Grid item md={3} />
          <Grid item md={6} xs={12}>
            <TextField
              value={user.name}
              onChange={(e) => {
                setUser({ ...user, name: e.target.value });
              }}
              fullWidth
              label="Full Name"
              variant="standard"
            />
          </Grid>
          <Grid item md={3} />
          <Grid item md={3} />
          <Grid item md={6} xs={12}>
            <TextField
              value={user.username}
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
              }}
              fullWidth
              label="Username"
              variant="standard"
            />
          </Grid>
          <Grid item md={3} />
          <Grid item md={3} />
          <Grid item md={6} xs={12}>
            <TextField
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
              fullWidth
              type="password"
              label="Password"
              variant="standard"
            />
          </Grid>
          <Grid item md={3} />
          <Grid item md={3} />
          <Grid item md={6} xs={12}>
            <TextField
              value={user.confirmPassword}
              onChange={(e) => {
                setUser({ ...user, confirmPassword: e.target.value });
              }}
              fullWidth
              type="password"
              label="Confirm Password"
              variant="standard"
            />
          </Grid>
          <Grid item md={3} />
          <Grid item md={3} />
          <Grid item md={6} xs={12}>
            <TextField
              value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
              fullWidth
              label="Email"
              variant="standard"
            />
          </Grid>
          <Grid item md={3} />
          <Grid item md={3} />
          <Grid item md={6} xs={12}>
            <TextField
              value={user.confirmEmail}
              onChange={(e) => {
                setUser({ ...user, confirmEmail: e.target.value });
              }}
              fullWidth
              label="Confirm Email"
              variant="standard"
            />
          </Grid>

          <Grid item md={3} />
          <Grid item md={3} />
          <Grid item md={6} xs={12}>
            <br />
            <center>
              <Button
                onClick={() => {
                  register();
                }}
                fullWidth
                variant="contained"
                color="secondary"
                style={{ width: "300px" }}
              >
                Register
              </Button>
            </center>
            <br />
            <br />
          </Grid>
          <Grid item md={3} />
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container>
        <Grid item sx={12}>
          <Typography variant="overline">
            The Accountant &copy; 2022 All Rights Reserved
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
