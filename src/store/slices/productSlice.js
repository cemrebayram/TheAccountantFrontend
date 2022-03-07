
import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import axios from '../../service/axios'
export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
    let products = await axios.get('/product')
    return products.data.map(product => ({
        id: product._id,
        title: product.title,
        price: product.price,
        unit: product.unit,
    }))
})

export const deleteProduct = createAsyncThunk('product/deleteProduct',async(id)=>{
    let deleted = await axios.delete(`/product/${id}`)
    return deleted;
})

export const editProduct = createAsyncThunk('product/editProduct',async(product)=>{
    let edited = await axios.put(`/product/${product.id}`,product)
    return edited;
})

export const createProduct = createAsyncThunk('product/createProduct', async (product) => {
    let newProduct = await axios.post('/product', product)
    return {
        id: newProduct.data._id,
        title: newProduct.data.title,
        price: newProduct.data.price,
        unit: newProduct.data.unit,
    }
});

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        newProduct: {
            id: '',
            title:'',
            price:0,
            unit:'piece',
        },
        products: [],
    },
    reducers: {
        setNewProduct: (state, action) => {
            state.newProduct = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        clearNewProduct: (state) => {
            state.token = '';
            state.newProduct = {
                id: '',
                title:'',
                price:0,
                unit:'piece',
            };
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        });
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.products.push(action.payload);
        });
        builder.addCase(deleteProduct.fulfilled,(state,action)=>{
            fetchProducts()
        })
    }
})

export const { setProducts, clearNewProduct, setNewProduct } = productSlice.actions

export default productSlice.reducer