import { Box } from "@mui/material";
import React from "react";
import CustomerSelect from "./CustomerSelect";
import ContractNoteSummaryTable from "./ContractNoteSummaryTable";
import ProductSelect from "./ProductSelect";

export default function ContractNoteInputForm() {
  return (
    <Box>
      <CustomerSelect />
      <ProductSelect />
      <ContractNoteSummaryTable />
    </Box>
  );
}
