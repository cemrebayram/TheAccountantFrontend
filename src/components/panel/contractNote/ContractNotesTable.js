import React from 'react'

import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { PictureAsPdf as PDF } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { generateContractNotePDF } from '../../../store/slices/contractNoteSlice';

export default function ContractNotesTable({ contractNotes }) {
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
                {contractNotes.map((contractNote) => (
                    <TableRow
                        key={contractNote._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {contractNote.customer.companyName}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {contractNote.customer.name}
                        </TableCell>
                        <TableCell>
                            <IconButton onClick={
                                () => {
                                    
                                    dispatch(generateContractNotePDF(contractNote._id));
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
