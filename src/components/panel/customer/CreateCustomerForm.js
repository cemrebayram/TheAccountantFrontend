import { Container, Grid, TextField, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../service/axios";
import {
  setNewCustomer,
  clearNewCustomer,
  createCustomer,
  fetchCustomers,
} from "../../../store/slices/customerSlice";

export default function CreateCustomerForm() {
  const customer = useSelector((state) => state.customer.newCustomer);
  useEffect(() => {
    console.log(customer);
  }, []);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setNewCustomer({ ...customer, [e.target.name]: e.target.value }));
  };
  const handleCreateCustomer = (e) => {
    dispatch(createCustomer(customer));
    // dispatch(fetchCustomers())
  };
  return (
    <Container
      sx={{
        marginTop: "10rem",
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        rowSpacing={3}
        mt={1}
      >
        <Grid item md={12} xs={12}>
          <Typography variant="h6">Create Customer</Typography>
          <Typography variant="body1">
            Please add the customer information.
          </Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            value={customer.name}
            name="name"
            onChange={handleChange}
            fullWidth
            label="Full Name"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            value={customer.companyName}
            name="companyName"
            onChange={handleChange}
            fullWidth
            label="Company Name"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            value={customer.uid}
            name="uid"
            onChange={handleChange}
            fullWidth
            label="UID"
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <TextField
            value={customer.address}
            name="address"
            onChange={handleChange}
            fullWidth
            label="Address"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            value={customer.plz}
            name="plz"
            onChange={handleChange}
            fullWidth
            label="Postal Code"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            value={customer.city}
            name="city"
            onChange={handleChange}
            fullWidth
            label="City"
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <TextField
            value={customer.telefon}
            name="telefon"
            onChange={handleChange}
            fullWidth
            label="Phone"
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <TextField
            value={customer.email}
            name="email"
            onChange={handleChange}
            fullWidth
            label="Email"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              handleCreateCustomer();
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
