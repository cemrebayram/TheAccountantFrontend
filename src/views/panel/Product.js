import React from "react";
import { Container } from "@mui/material";

import ProductInputs from "../../components/panel/product/ProductInputs";
import ProductList from "../../components/panel/product/ProductList";

export default function Product() {
  return (
    <Container>
      <ProductInputs />
      <ProductList />
    </Container>
  );
}
