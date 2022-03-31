import { Container } from "@mui/material";
import React from "react";
import CreateCustomerForm from "../../components/panel/customer/CreateCustomerForm";
import CustomerDataTable from "../../components/panel/customer/CustomerDataTable";
export default function Customer() {
  return (
    <Container>
      <CreateCustomerForm />
      <CustomerDataTable />
    </Container>
  );
}
