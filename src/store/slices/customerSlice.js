import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import axios from '../../service/axios'
export const fetchCustomers = createAsyncThunk('customer/fetchCustomers', async () => {
    let customers = await axios.get('/customer')
    return customers.data.map(customer => ({
        id: customer._id,
        name: customer.name,
        address: customer.address,
        uid: customer.uid,
        companyName: customer.companyName,
        telefon: customer.telefon,
        email: customer.email,
        city: customer.city,
        plz: customer.plz
    }))
})

export const deleteCustomer = createAsyncThunk('customer/deleteCustomer',async(id)=>{
    let deleted = await axios.delete(`/customer/${id}`)
    return deleted;
})

export const editCustomer = createAsyncThunk('customer/editCustomer',async(customer)=>{
    let edited = await axios.put(`/customer/${customer.id}`,customer)
    return edited;
})

export const createCustomer = createAsyncThunk('customer/createCustomer', async (customer) => {
    let newCustomer = await axios.post('/customer', customer)
    return {
        id: newCustomer.data._id,
        name: newCustomer.data.name,
        address: newCustomer.data.address,
        uid: newCustomer.data.uid,
        telefon: newCustomer.data.telefon,
        companyName: newCustomer.data.companyName,
        email: newCustomer.data.email,
        city: newCustomer.data.city,
        plz: newCustomer.data.city
    }
});

export const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        newCustomer: {
            id: '',
            name: '',
            address: '',
            uid: '',
            companyName:'',
            plz: '',
            telefon: '',
            email: '',
            city: '',
        },
        customers: [],
    },
    reducers: {
        setNewCustomer: (state, action) => {
            state.newCustomer = action.payload;
        },
        setCustomers: (state, action) => {
            state.customers = action.payload;
        },
        clearNewCustomer: (state) => {
            state.token = '';
            state.newCustomer = {
                id: '',
                name: '',
                address: '',
                uid: '',
                companyName:'',
                telefon: '',
                email: '',
                plz: '',
                city: '',
            };
            //window.location.href = '/login';
            return state;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchCustomers.fulfilled, (state, action) => {
            state.customers = action.payload; //action.payload fetchCustomers fonksiyonundan dönen değerdir yani serverdan çektiğimiz customers array'i
        });
        builder.addCase(createCustomer.fulfilled, (state, action) => {
            state.customers.push(action.payload);
        });
        builder.addCase(deleteCustomer.fulfilled,(state,action)=>{
            fetchCustomers()
        })
    }
})

export const { setCustomers, clearNewCustomer, setNewCustomer } = customerSlice.actions

export default customerSlice.reducer