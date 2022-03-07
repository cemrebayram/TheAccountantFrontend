import { Container, Grid, TextField, Button, Typography, Select, MenuItem, InputLabel } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../service/axios'
import { setNewProduct, clearNewProduct, createProduct, fetchProducts } from '../../../store/slices/productSlice'
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
export default function Product() {
    const product = useSelector(state => state.product.newProduct)
    useEffect(() => {
        console.log(product)
    }, []);
    const dispatch = useDispatch();
    const handleChange = (e) => {
        dispatch(setNewProduct({ ...product, [e.target.name]: e.target.value }))
    }
    const handleCreateProduct = (e) => {
        dispatch(createProduct(product))
        // dispatch(fetchProducts())
    }

    return (
        <Container>
            <Grid container justifyContent="center" alignItems="center" rowSpacing={3} mt={1} >
                <Grid item md={12} xs={12}>
                    <Typography variant="h4" >Product</Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                    <TextField value={product.title} name="title" onChange={handleChange} fullWidth label="Title" />
                </Grid>
                <Grid item md={6} xs={12}>
                    <TextField type="number" value={product.price} name="price" onChange={handleChange} fullWidth label="Price" variant="outlined" />
                </Grid>

                <Grid item md={7} xs={12}>
                    <InputLabel id="unit-select">Unit</InputLabel>
                    <Select
                        fullWidth
                        labelId="unit-select"
                        id="unit-select"
                        label="Unit"
                        name="unit"
                        value={product.unit}
                        onChange={handleChange}
                    >
                        <MenuItem value="piece">Piece</MenuItem>
                        <MenuItem value="meter">Meter</MenuItem>
                        <MenuItem value="centimeter">Centimeter</MenuItem>
                        <MenuItem value="hour">Hour</MenuItem>
                        <MenuItem value="squaremeter">m²</MenuItem>
                        <MenuItem value="liter">Liter</MenuItem>

                    </Select>
                </Grid>
                <Grid item md={8} xs={12}>
                    <Button variant="contained" color="success" fullWidth onClick={() => {
                        handleCreateProduct();
                    }}>Save</Button>
                </Grid>
            </Grid>
        </Container>
    )
}
