import { Select, MenuItem, InputLabel } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from '../../../store/slices/customerSlice';
import { setNewOffer  } from '../../../store/slices/offerSlice';

export default function CustomerSelect() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCustomers());
    }, [])
    const [_customer,_setCustomer] = useState({})
    const customers = useSelector(state => state.customer.customers);
    const newOffer = useSelector(state => state.offer.newOffer);
    const handleChange = (event) => {
        _setCustomer(event.target.value);
        dispatch(setNewOffer({ ...newOffer, customer: {_id:event.target.value} }));
    }
    return (
        <>
            <InputLabel id="demo-simple-select-label">Select Customer</InputLabel>
            {customers && newOffer ? <Select
                fullWidth
                labelId="demo-simple-select-label"
                label="Select Customer"
                onChange={handleChange}
            >
                {customers.map(customer => (
                    <MenuItem key={customer.id} value={customer.id}>{customer.name}</MenuItem>
                ))}
            </Select>:''}
        </>
    )
}
