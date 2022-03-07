import { Select, MenuItem, InputLabel, Box, Grid, Typography, Divider, List, ListItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from '../../../store/slices/customerSlice';
import { setNewContractNote } from '../../../store/slices/contractNoteSlice';
import ContractNoteSummaryTableProductListItem from './ContractNoteSummaryTableProductListItem';

export default function ContractNoteSummaryTable() {
    const newContractNote = useSelector(state => state.contractNote.newContractNote);
    const customers = useSelector(state => state.customer.customers);
    const products = useSelector(state => state.product.products);
    const selectedCustomer = customers.find((customer) => customer.id == newContractNote.customer._id)
    return (
        selectedCustomer ? <Grid container borderRadius="3%" border="2px purple solid" padding={2} mt={7}>
             <Grid item md={6}>
                <Box>
                    <Typography variant='h3'> {selectedCustomer.companyName} </Typography>
                    <Typography variant='h5'> {selectedCustomer.name} </Typography>
                    <Typography variant='overline'> {selectedCustomer.uid} </Typography>
                    <Typography> Email : {selectedCustomer.email} </Typography>
                    <Typography> Phone : {selectedCustomer.telefon} </Typography>
                    <Typography> Address : {selectedCustomer.address}</Typography>
                    <Typography> PLZ : {selectedCustomer.plz} </Typography>
                    <Typography> City : {selectedCustomer.city} </Typography>
                </Box>
            </Grid>
            <Grid item md={6}>
                <Typography variant='overline'>Products</Typography>
                <List dense>
                    {newContractNote.products.map((product, index) => (
                        <ContractNoteSummaryTableProductListItem key={index} product={products.find((_product)=> _product.id == product._id )} />
                    ))}
                </List>
            </Grid>

        </Grid> : <div></div>
    )
}
