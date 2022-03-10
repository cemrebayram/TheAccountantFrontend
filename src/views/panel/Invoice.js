import React from "react";
import InvoiceInputForm from "../../components/panel/invoice/InvoiceInputForm";
import { Button, Container, Typography, Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { createInvoice, fetchInvoices } from "../../store/slices/invoiceSlice";
import InvoicesTable from "../../components/panel/invoice/InvoicesTable";
export default function Offser() {
  const newInvoice = useSelector((state) => state.invoice.newInvoice);
  const invoices = useSelector((state) => state.invoice.invoices);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchInvoices());
  }, []);
  return (
    <Container>
      <br />
      <br />
      <br />
      <br />
      <Divider sx={{ margin: "30px 0" }}>
        <img width="50px" src="/../../offer.png"></img>
      </Divider>
      <Typography variant="h4">Invoice</Typography>
      <InvoiceInputForm />
      <Button
        onClick={() => {
          dispatch(createInvoice(newInvoice));
          dispatch(fetchInvoices());
        }}
        sx={{ marginTop: "10px" }}
        fullWidth
        variant="contained"
        color="secondary"
      >
        Create Invoice
      </Button>
      <InvoicesTable invoices={invoices} />
    </Container>
  );
}
