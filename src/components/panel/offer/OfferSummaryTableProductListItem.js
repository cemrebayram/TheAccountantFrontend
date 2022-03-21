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
export default function OfferSummaryTableProductListItem({ product}) {
  
  return (
    <TableRow>
      <TableCell>
        <Typography variant="h6">{product.title}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h6">{product.price} €</Typography>
      </TableCell>
     <TableCell>
       x
     </TableCell>
      <TableCell>
        <Typography variant="h6">{product.quantity}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h6">{product.unit}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h6">{product.price * product.quantity} €</Typography>
      </TableCell>
    </TableRow>
  );
}
