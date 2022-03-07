import { Box } from '@mui/material'
import React from 'react'
import CustomerSelect from './CustomerSelect'
import OfferSummaryTable from './OfferSummaryTable'
import ProductSelect from './ProductSelect'

export default function OfferInputForm() {
    return (
        <Box>
            <CustomerSelect />
            <ProductSelect />
            <OfferSummaryTable/>
        </Box>
    )
}
