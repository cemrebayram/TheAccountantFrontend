import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { Container, Grid, Typography, TextField, Button } from "@mui/material";
import axios from "../../service/axios";
import NavigationButtons from "../../components/panel/home/NavigationButtons";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const links = [
    { title: "Todo", to: "/panel/todo", color: "secondary" },
    { title: "Customer", to: "/panel/customer", color: "secondary" },
    { title: "Products", to: "/panel/product", color: "secondary" },
    { title: "Offer", to: "/panel/offer", color: "secondary" },
    { title: "Contract Note", to: "/panel/contract-note", color: "secondary" },
    { title: "Invoice", to: "/panel/invoice", color: "secondary" },
  ];

  const token = useSelector((state) => state.user.token);
  useEffect(() => {
    if (!token) navigate("/login");
  }, []);

  return (
    <Container
      sx={{
        paddingBottom: "50px",
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        rowSpacing={3}
        mt={1}
        mb={1}
      >
        <Grid item md={12} xs={12}>
          <Typography variant="h5">Press the desired service.</Typography>
        </Grid>

        <NavigationButtons links={links} />
      </Grid>
    </Container>
  );
}
