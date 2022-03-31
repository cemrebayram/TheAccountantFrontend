import { Select, MenuItem, InputLabel, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../../store/slices/customerSlice";
import { setNewContractNote } from "../../../store/slices/contractNoteSlice";

export default function CustomerSelect() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);
  const [_customer, _setCustomer] = useState({});
  const customers = useSelector((state) => state.customer.customers);
  const newContractNote = useSelector(
    (state) => state.contractNote.newContractNote
  );
  const handleChange = (event) => {
    _setCustomer(event.target.value);
    dispatch(
      setNewContractNote({
        ...newContractNote,
        customer: { _id: event.target.value },
      })
    );
  };
  return (
    <>
      <InputLabel id="demo-simple-select-label">Select Customer</InputLabel>
      {customers && newContractNote ? (
        <Select
          fullWidth
          labelId="demo-simple-select-label"
          label="Select Customer"
          onChange={handleChange}
        >
          {customers.map((customer) => (
            <MenuItem key={customer.id} value={customer.id}>
              {customer.name}
            </MenuItem>
          ))}
        </Select>
      ) : (
        ""
      )}
    </>
  );
}
