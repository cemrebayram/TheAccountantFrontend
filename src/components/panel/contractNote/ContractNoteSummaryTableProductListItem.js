import React from "react";
import {
  ListItem,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
export default function ContractNoteSummaryTableProductListItem({ product }) {
  return (
    <TableRow>
      <TableCell>
        <Typography variant="caption">{product.title}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="caption">{product.price} €</Typography>
      </TableCell>
      <TableCell>x</TableCell>
      <TableCell>
        <Typography variant="caption">{product.quantity}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="caption">{product.unit}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="caption">
          {product.price * product.quantity} €
        </Typography>
      </TableCell>
    </TableRow>
  );
}
