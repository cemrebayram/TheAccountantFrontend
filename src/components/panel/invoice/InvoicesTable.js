import React from 'react'

import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { PictureAsPdf as PDF } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { generateInvoicePDF } from '../../../store/slices/invoiceSlice';

export default function InvoicesTable({ invoices }) {
    const dispatch = useDispatch();
    return (
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Company Name</TableCell>
                    <TableCell>Person Name</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow
                        key={invoice._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {invoice.customer.companyName}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {invoice.customer.name}
                        </TableCell>
                        <TableCell>
                            <IconButton onClick={
                                () => {
                                    console.log("HEY HEY HEY")
                                    dispatch(generateInvoicePDF(invoice._id));
                                }
                            } sx={
                                {
                                    color: '#cf421f',
                                }
                            } >
                                <PDF sx={
                                    {
                                        fontSize: '35px'
                                    }
                                } />
                            </IconButton>

                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
