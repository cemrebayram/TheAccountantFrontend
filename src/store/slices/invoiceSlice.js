import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import axios from '../../service/axios'
export const fetchInvoices = createAsyncThunk('invoice/fetchInvoices', async () => {
    let invoices = await axios.get('/invoice')
    return invoices.data;
})

export const generateInvoicePDF = createAsyncThunk('invoice/generateInvoicePDF', async (invoiceId) => {
    let pdf = await axios.get(`/invoice/pdf/${invoiceId}`,{
        responseType: 'arraybuffer',
        responseEnconding: 'binary'
    })
    return pdf.data;
});

export const createInvoice = createAsyncThunk('invoice/createInvoice', async (invoice) => {
    let newInvoice = await axios.post('/invoice', invoice)
    return newInvoice;
});

const base64toBlob = (data) => {
    // Cut the prefix `data:application/pdf;base64` from the raw base 64
    const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);

    const bytes = atob(base64WithoutPrefix);
    let length = bytes.length;
    let out = new Uint8Array(length);

    while (length--) {
        out[length] = bytes.charCodeAt(length);
    }

    return new Blob([out], { type: 'application/pdf' });
};

export const invoiceSlice = createSlice({
    name: 'invoice',
    initialState: {
        tempInvoiceProductQuantity: 1,
        newInvoice: {
            customer: {}, // { _id:'adadadd' }
            products: [], // [ { _id:'adadadd' }, { _id:'adadadd' } ]
        },
        invoices: [],
    },
    reducers: {
        setNewInvoice: (state, action) => {
            state.newInvoice = action.payload;
        },
        setInvoices: (state, action) => {
            state.invoices = action.payload;
        },
        clearNewInvoice: (state) => {
            state.newInvoice = {
                customer: {},
                products: [],
            };
            state.tempInvoiceProductQuantity = 1;
        },
        setTempInvoiceProductQuantity: (state, action) => {
            state.tempInvoiceProductQuantity = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchInvoices.fulfilled, (state, action) => {
            state.invoices = action.payload;
        });
        builder.addCase(createInvoice.fulfilled, (state, action) => {
            console.log("Eklendi");
        });
        builder.addCase(generateInvoicePDF.fulfilled, (state, action) => {
            var blob = new Blob([action.payload], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            window.open(url);
        });
    }
})

export const { setInvoices, clearNewInvoice, setNewInvoice, setTempInvoiceProductQuantity } = invoiceSlice.actions;


export default invoiceSlice.reducer