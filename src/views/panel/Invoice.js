import React from 'react'
import InvoiceInputForm from '../../components/panel/invoice/InvoiceInputForm'
import { Button, Container, Typography } from '@mui/material'
import { useSelector,useDispatch } from 'react-redux'
import { createInvoice, fetchInvoices } from '../../store/slices/invoiceSlice'
import InvoicesTable from '../../components/panel/invoice/InvoicesTable'
export default function Offser() {
    const newInvoice = useSelector(state => state.invoice.newInvoice)
    const invoices = useSelector(state => state.invoice.invoices)
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(fetchInvoices());
    }, [])
    return (
        <Container 
            sx={{
                marginTop: '10rem',
            }}
        >
            <Typography variant="h4">Invoice</Typography>
            <InvoiceInputForm/>
            <Button onClick={()=>{
                dispatch(createInvoice(newInvoice));
                dispatch(fetchInvoices());
            }} sx={{marginTop:'10px'}} fullWidth variant="contained" color="warning">Create Invoice</Button>
            <InvoicesTable invoices={invoices} />
        </Container>
    )
}
