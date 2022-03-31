import { Box } from "@mui/material";
import React from "react";
import CustomerSelect from "./CustomerSelect";
import InvoiceSummaryTable from "./InvoiceSummaryTable";
import ProductSelect from "./ProductSelect";

export default function InvoiceInputForm() {
  return (
    <Box>
      <CustomerSelect />
      <ProductSelect />
      <InvoiceSummaryTable />
    </Box>
  );
}
