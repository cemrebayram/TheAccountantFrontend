import AppBar from "./components/Appbar";
import React from "react";
import Login from "./views/Login";
import Register from "./views/Register";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
//panel routes
import Home from "./views/panel/Home";
import Customer from "./views/panel/Customer";
import Todo from "./views/panel/Todo";
import Product from "./views/panel/Product";
import Offer from "./views/panel/Offer";
import ContractNote from "./views/panel/ContractNote";
import Invoice from "./views/panel/Invoice";
import Profile from "./views/panel/Profile";

const Panel = {
  Home,
  Customer,
  Todo,
  Product,
  Offer,
  ContractNote,
  Invoice,
  Profile,
};
export default function App() {
  return (
    <Box>
      <AppBar />
      <Routes>
        <Route path="/" element={<Panel.Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/panel">
          <Route index element={<Panel.Home />} />
          <Route path="customer" element={<Panel.Customer />} />
          <Route path="todo" element={<Panel.Todo />} />
          <Route path="product" element={<Panel.Product />} />
          <Route path="offer" element={<Panel.Offer />} />
          <Route path="contract-note" element={<Panel.ContractNote />} />
          <Route path="invoice" element={<Panel.Invoice />} />
          <Route path="profile" element={<Panel.Profile />} />
        </Route>
      </Routes>
    </Box>
  );
}
