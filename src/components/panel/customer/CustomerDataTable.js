import { Container, Divider, Chip, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCustomer,
  fetchCustomers,
  editCustomer,
} from "../../../store/slices/customerSlice";
import { Delete } from "@mui/icons-material";
export default function CustomerDataTable() {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customer.customers);
  const handleCellEditCommit = async (params) => {
    let editedId = params.id;
    let editedValue = params.value;
    let editedField = params.field;
    let editedCustomer = customers.find((customer) => customer.id === editedId);
    let editedCustomerCopy = { ...editedCustomer, [editedField]: editedValue };
    await dispatch(editCustomer(editedCustomerCopy));
    dispatch(fetchCustomers());
  };
  console.log(customers);
  const handleDeleteClick = async (id) => {
    await dispatch(deleteCustomer(id));
    dispatch(fetchCustomers());
  };
  useEffect(() => {
    //ikinci parametresinde boş bir dizi varsa bunun gibi yalnızca bir kere çalışır.
    dispatch(fetchCustomers()); //customerları serverdan çekiyoruz.
  }, []);
  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions({ id }) {
        return [
          <IconButton onClick={() => handleDeleteClick(id)}>
            {" "}
            <Delete />{" "}
          </IconButton>,
        ];
      },
    },
    { field: "name", headerName: "Name", width: 150, editable: true },
    {
      field: "companyName",
      headerName: "Company Name",
      width: 150,
      editable: true,
    },
    { field: "uid", headerName: "UID", width: 150, editable: true },
    { field: "address", headerName: "Address", width: 150, editable: true },
    { field: "plz", headerName: "PLZ", width: 150, editable: true },
    { field: "city", headerName: "City", width: 150, editable: true },
    { field: "email", headerName: "Email", width: 150, editable: true },
    { field: "telefon", headerName: "Telefon", width: 150, editable: true },
  ];
  return (
    <Container sx={{ padding: "10px 0", marginTop: "1em" }}>
      <br />
      <center>
        <img width="100px" src="/../../createCustomer.png"></img>
      </center>
      <Divider sx={{ margin: "30px 0" }}>
        <Chip label="Customers Table" />
      </Divider>
      <Container style={{ height: 400, width: "100%" }}>
        <DataGrid
          onCellEditCommit={handleCellEditCommit}
          rows={customers}
          columns={columns}
          style={{ color: "purple" }}
        />
      </Container>
    </Container>
  );
}
