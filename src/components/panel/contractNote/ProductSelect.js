import {
  Select,
  MenuItem,
  InputLabel,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../store/slices/productSlice";
import {
  setNewContractNote,
  setTempContractNoteProductQuantity,
} from "../../../store/slices/contractNoteSlice";
import { Add } from "@mui/icons-material";

import QuantitySelect from "../common/QuantitySelect";

export default function ProductSelect() {
  const dispatch = useDispatch();
  useEffect(async () => {
    await dispatch(await fetchProducts());
  }, []);
  const tempContractNoteProductQuantity = useSelector(
    (state) => state.contractNote.tempContractNoteProductQuantity
  );
  const [selectedProduct, setSelectedProduct] = useState("");
  const products = useSelector((state) => state.product.products);
  const newContractNote = useSelector(
    (state) => state.contractNote.newContractNote
  );
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      spacing={3}
      rowSpacing={3}
    >
      <Grid item xs={6}>
        <InputLabel id="demo-simple-select-label">Select Product</InputLabel>
        {products.length > 0 ? (
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            label="Select Product"
            onChange={(e) => {
              let selectedId = e.target.value;
              setSelectedProduct(selectedId);
            }}
          >
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.title}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <Typography>No Products</Typography>
        )}
      </Grid>
      <Grid item xs={2}>
        <InputLabel>Quantity</InputLabel>
        <QuantitySelect
          value={tempContractNoteProductQuantity}
          setter={(value) => {
            dispatch(setTempContractNoteProductQuantity(value));
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <Button
          onClick={() => {
            if (selectedProduct) {
              let newProduct = newContractNote.products.find(
                (product) => product._id == selectedProduct
              );
              if (!newProduct) {
                dispatch(
                  setNewContractNote({
                    ...newContractNote,
                    products: [
                      ...newContractNote.products,
                      {
                        product: { _id: selectedProduct },
                        quantity: tempContractNoteProductQuantity,
                      },
                    ],
                  })
                );
                dispatch(setTempContractNoteProductQuantity(1));
              } else alert("Product already added");
            }
          }}
          fullWidth
          sx={{ height: "53px", marginTop: "20px" }}
          color="primary"
          variant="contained"
        >
          {" "}
          <Add /> Add{" "}
        </Button>
      </Grid>
    </Grid>
  );
}
