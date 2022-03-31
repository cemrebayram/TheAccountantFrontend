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
  setNewOffer,
  setTempOfferProductQuantity,
} from "../../../store/slices/offerSlice";
import { Add } from "@mui/icons-material";
import QuantitySelect from "../common/QuantitySelect";

import QuantitySelect from "../common/QuantitySelect";

export default function ProductSelect() {
  const dispatch = useDispatch();
  useEffect(async () => {
    await dispatch(await fetchProducts());
  }, []);
  const tempOfferProductQuantity = useSelector(
    (state) => state.offer.tempOfferProductQuantity
  );

  const [selectedProduct, setSelectedProduct] = useState("");
  const products = useSelector((state) => state.product.products);
  const newOffer = useSelector((state) => state.offer.newOffer);
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
          <Typography style={{ color: "red" }}>No Products!</Typography>
        )}
      </Grid>
      <Grid item xs={2}>
        <InputLabel>Quantity</InputLabel>
        <QuantitySelect
          value={tempOfferProductQuantity}
          setter={(value) => {
            dispatch(setTempOfferProductQuantity(value));
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <Button
          onClick={() => {
            if (selectedProduct) {
              let newProduct = newOffer.products.find(
                (product) => product._id == selectedProduct
              );
              console.log(newProduct);
              if (!newProduct) {
                dispatch(
                  setNewOffer({
                    ...newOffer,
                    products: [
                      ...newOffer.products,
                      {
                        product: { _id: selectedProduct },
                        quantity: tempOfferProductQuantity,
                      },
                    ],
                  })
                );
                dispatch(setTempOfferProductQuantity(1));
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
