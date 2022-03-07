import {
  Container,
  Divider,
  TextField,
  Grid,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../store/slices/userSlice";
import axios from "../service/axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/panel/common/FooterT.js";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertData, setAlertData] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const handleClose = () => setAlertData({ ...alertData, open: false });

  const showAlert = (message, severity) => {
    setAlertData({
      severity,
      open: true,
      message,
    });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const login = () => {
    if (username.length > 0 && password.length > 0) {
      axios
        .post("/auth/login", { username, password })
        .then((res) => {
          showAlert(res.data.message, "success");

          let token = res.data.token;
          let user = res.data.user;
          console.log(token);
          dispatch(setToken(token));
          console.log(user);
          dispatch(setUser(user));
          //route to panel
          setTimeout(() => {
            navigate("/panel");
          }, 1500);
        })
        .catch((err) => {
          showAlert("Invalid username or password", "error");
        });
    } else {
      showAlert("Please fill all fields", "error");
    }
  };
  return (
    <Container>
      <Snackbar
        open={alertData.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={handleClose}
          severity={alertData.severity}
          sx={{ width: "100%" }}
        >
          {alertData.message}
        </Alert>
      </Snackbar>
      <br />
      <br />
      <br />
      <br />
      <Divider sx={{ margin: "30px 0" }}>
        <img width="60px" src="/../../key.png"></img>
      </Divider>
      <Grid
        container
        borderRadius="3%"
        border="2px lightgrey solid"
        padding={2}
        mt={3}
      >
        <Grid container rowSpacing={3} mt={3}>
          <Grid item md={3} />
          <Grid item md={6} xs={12}>
            <center>
              <Typography variant="h5">Login</Typography>
            </center>
          </Grid>
          <Grid item md={3} />
          <Grid item md={3} />
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              variant="standard"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="Username"
            />
          </Grid>
          <Grid item md={3} />
          <Grid item md={3} />
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              type="Password"
              label="Password"
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item md={3} />
          <Grid item md={3} />
          <Grid item md={6} xs={12}>
            <center>
              <Button
                onClick={() => login()}
                variant="contained"
                color="secondary"
                style={{ width: "300px" }}
              >
                Login
              </Button>
            </center>
            <br />
          </Grid>
          <Grid item md={3} />
        </Grid>
        <Grid container>
          <Grid item sx={12} style={{ bottom: "0px", position: "absolute" }}>
            <Typography variant="overline">
              The Accountant &copy; 2022 All Rights Reserved
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
