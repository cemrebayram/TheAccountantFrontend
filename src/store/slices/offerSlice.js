import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import axios from '../../service/axios'
export const fetchOffers = createAsyncThunk('offer/fetchOffers', async () => {
    let offers = await axios.get('/offer')
    return offers.data;
})

export const generateOfferPDF = createAsyncThunk('offer/generateOfferPDF', async (offerId) => {
    let pdf = await axios.get(`/offer/pdf/${offerId}`,{
        responseType: 'arraybuffer',
        responseEnconding: 'binary'
    })
    return pdf.data;
});

export const createOffer = createAsyncThunk('offer/createOffer', async (offer) => {
    let newOffer = await axios.post('/offer', offer)
    return newOffer;
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

export const offerSlice = createSlice({
    name: 'offer',
    initialState: {
        newOffer: {
            customer: {}, // { _id:'adadadd' }
            products: [], // [ { _id:'adadadd' }, { _id:'adadadd' } ]
        },
        offers: [],
    },
    reducers: {
        setNewOffer: (state, action) => {
            state.newOffer = action.payload;
        },
        setOffers: (state, action) => {
            state.offers = action.payload;
        },
        clearNewOffer: (state) => {
            state.newOffer = {
                customer: {},
                products: [],
            };
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchOffers.fulfilled, (state, action) => {
            state.offers = action.payload;
        });
        builder.addCase(createOffer.fulfilled, (state, action) => {
            console.log("Eklendi");
        });
        builder.addCase(generateOfferPDF.fulfilled, (state, action) => {
            var blob = new Blob([action.payload], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            window.open(url);
        });
    }
})

export const { setOffers, clearNewOffer, setNewOffer } = offerSlice.actions

export default offerSlice.reducer