import React,{useState} from "react";
import InvoiceInputForm from "../../components/panel/invoice/InvoiceInputForm";
import { Button, Container, Typography, Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { createInvoice, fetchInvoices } from "../../store/slices/invoiceSlice";
import InvoicesTable from "../../components/panel/invoice/InvoicesTable";
import Notification from "../../components/panel/common/Notification";
export default function Offser() {
  const newInvoice = useSelector((state) => state.invoice.newInvoice);
  const invoices = useSelector((state) => state.invoice.invoices);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchInvoices());
  }, []);
  const [alertData, setAlertData] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const showAlert = (message, severity) => {
    setAlertData({
      severity,
      open: true,
      message,
    });
  };
  return (
    <Container  sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      marginTop: "5em",
      paddingBottom: "5em",
    }}>
       <Notification open={alertData.open} severity={alertData.severity} message={alertData.message} />
      <Divider sx={{ margin: "30px 0" }}>
        <img width="50px" src="/../../offer.png"></img>
      </Divider>
      <Typography variant="h4">Invoice</Typography>
      <InvoiceInputForm />
      <Button
        onClick={async () => {
         await dispatch(createInvoice(newInvoice));
          dispatch(fetchInvoices());
          showAlert("Offer created successfully", "success");
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
