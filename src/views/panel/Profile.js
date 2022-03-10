import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { Container, Grid, Typography, TextField, Button, Alert,Snackbar } from "@mui/material";
import axios from "../../service/axios";

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [userData, setUserData] = useState({
    name: user.name,
    companyName: user.companyName,
    address: user.address,
    uid: user.uid,
    bankAccount: user.bankAccount,
    telefon: user.telefon,
    email: user.email,
  });

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

  const updateUser = (e) => {
    //{userData}=> {userData:{name,companyName,address,uid,bankAccount,telefon,email}}
    //{...userData} => {name:name,companyName:companyName,address:address,uid:uid,bankAccount:bankAccount,telefon:telefon,email:email}
    axios.post("/user/update", { ...userData }).then((res) => {
      showAlert(res.data.message,"success");
    }).catch((err) => {
      showAlert("Something went wrong","error");
    })
  };
  return (
    <Container
      sx={{
        marginTop: "8rem",
      }}
    >
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
      <h1>Profile</h1>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        rowSpacing={3}
        mt={1}
        mb={1}
      >
        <Grid item md={12} xs={12}>
          <Typography variant="h5">User Informations</Typography>
        </Grid>

        <Grid item md={6} xs={12}>
          <TextField
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            fullWidth
            label="Name"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            disabled
            value={user.username}
            fullWidth
            label="Username"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            value={userData.companyName}
            onChange={(e) =>
              setUserData({ ...userData, companyName: e.target.value })
            }
            fullWidth
            label="Company Name"
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <TextField
            value={userData.address}
            onChange={(e) =>
              setUserData({ ...userData, address: e.target.value })
            }
            fullWidth
            label="Address"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            value={userData.uid}
            onChange={(e) => setUserData({ ...userData, uid: e.target.value })}
            fullWidth
            label="UID"
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <TextField
            value={userData.bankAccount}
            onChange={(e) =>
              setUserData({ ...userData, bankAccount: e.target.value })
            }
            fullWidth
            label="Bank Account"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            value={userData.telefon}
            onChange={(e) =>
              setUserData({ ...userData, telefon: e.target.value })
            }
            fullWidth
            label="Telefon"
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <TextField
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            fullWidth
            label="Email"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Button
            color="error"
            variant="outlined"
            fullWidth
            onClick={() => {
              updateUser();
              // dispatch(setUser(userData))
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
