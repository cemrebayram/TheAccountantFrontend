
import { Container, Divider, Chip, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct,fetchProducts,editProduct } from '../../../store/slices/productSlice'
import { Delete } from '@mui/icons-material'
export default function ProductDataTable() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products);
    const handleCellEditCommit = async (params)=>{
        console.log("EDIIIIT !!!",params);
        let editedId = params.id;
        let editedValue = params.value;
        let editedField = params.field;
        let editedProduct = products.find(product => product.id === editedId);
        let editedProductCopy = {...editedProduct, [editedField]: editedValue};
        await dispatch(editProduct(editedProductCopy));
        dispatch(fetchProducts());
    }
    console.log(products);
    const handleDeleteClick = async (id) => {
       await dispatch(deleteProduct(id));
        dispatch(fetchProducts());
    }
    useEffect(() => {
        dispatch(fetchProducts());
    }, [])
    const columns = [{
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        getActions({id}) {
            return [
                <IconButton onClick={()=>handleDeleteClick(id)}> <Delete /> </IconButton>
            ]
        }
    },
    { field: 'title', headerName: 'Title', width: 250, editable: true },
    { field: 'price', headerName: 'Price', width: 150, editable: true },
    { field: 'unit', headerName: 'Unit', width: 150, editable: false },
    ];
    return (
        <Container sx={{ padding: "10px 0" }}>
            <Divider sx={{ margin: "30px 0" }}>
                <Chip label="Products Table" />
            </Divider>
            <Container style={{ height: 400, width: '100%' }}>
                <DataGrid onCellEditCommit={handleCellEditCommit} rows={products} columns={columns} />
            </Container>
        </Container>
    )
}
