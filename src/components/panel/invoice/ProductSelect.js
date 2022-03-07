import { Select, MenuItem, InputLabel, Typography, Grid, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../store/slices/productSlice';
import { setNewInvoice } from '../../../store/slices/invoiceSlice';
import { Add } from '@mui/icons-material'

export default function ProductSelect() {
    const dispatch = useDispatch();
    useEffect(async () => {
        await dispatch(await fetchProducts());
    }, [])
    const [selectedProduct, setSelectedProduct] = useState("");
    const products = useSelector(state => state.product.products);
    const newInvoice = useSelector(state => state.invoice.newInvoice);
    return (
        <Grid container alignItems="center" justifyContent="center" spacing={3} rowSpacing={3}>
            <Grid item xs={8}  >
                <InputLabel id="demo-simple-select-label">Select Product</InputLabel>
                {products.length > 0 ? <Select
                    fullWidth
                    labelId="demo-simple-select-label"
                    label="Select Product"
                    onChange={(e) => {
                        let selectedId = e.target.value;
                        setSelectedProduct(selectedId);
                    }}
                >
                    {products.map(product => (
                        <MenuItem key={product.id} value={product.id}>{product.title}</MenuItem>
                    ))}
                </Select> : <Typography>No Products</Typography>}
            </Grid>
            <Grid item xs={4}>
                <Button onClick={() => {
                    if (selectedProduct) {
                        let newProduct = newInvoice.products.find((product) => product._id== selectedProduct);
                        console.log(newProduct);
                        if (!newProduct) dispatch(setNewInvoice({ ...newInvoice, products: [...newInvoice.products, { _id: selectedProduct }] }));
                        else alert("Product already added");
                    }

                }} fullWidth sx={{ height: "100%" }} color="primary" variant="contained">  <Add />   Add Product</Button>
            </Grid>
        </Grid>
    )
}
