import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from "../../service/axios";
export const fetchContractNotes = createAsyncThunk(
  "contractNote/fetchContractNotes",
  async () => {
    let contractNotes = await axios.get("/contractNote");
    return contractNotes.data;
  }
);

export const generateContractNotePDF = createAsyncThunk(
  "contractNote/generateContractNotePDF",
  async (contractNoteId) => {
    let pdf = await axios.get(`/contractNote/pdf/${contractNoteId}`, {
      responseType: "arraybuffer",
      responseEnconding: "binary",
    });
    return pdf.data;
  }
);

export const createContractNote = createAsyncThunk(
  "contractNote/createContractNote",
  async (contractNote) => {
    let newContractNote = await axios.post("/contractNote", contractNote);
    return newContractNote;
  }
);

const base64toBlob = (data) => {
  // Cut the prefix `data:application/pdf;base64` from the raw base 64
  const base64WithoutPrefix = data.substr(
    "data:application/pdf;base64,".length
  );

  const bytes = atob(base64WithoutPrefix);
  let length = bytes.length;
  let out = new Uint8Array(length);

  while (length--) {
    out[length] = bytes.charCodeAt(length);
  }

  return new Blob([out], { type: "application/pdf" });
};

export const contractNoteSlice = createSlice({
  name: "contractNote",
  initialState: {
    tempContractNoteProductQuantity: 1,
    newContractNote: {
      customer: {}, // { _id:'adadadd' }
      products: [], // [ { _id:'adadadd' }, { _id:'adadadd' } ]
    },
    contractNotes: [],
  },
  reducers: {
    setNewContractNote: (state, action) => {
      state.newContractNote = action.payload;
    },
    setContractNotes: (state, action) => {
      state.contractNotes = action.payload;
    },
    clearNewContractNote: (state) => {
      state.newContractNote = {
        customer: {},
        products: [],
      };
      state.tempContractNoteProductQuantity = 1;
    },
    setTempContractNoteProductQuantity: (state, action) => {
      state.tempContractNoteProductQuantity = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchContractNotes.fulfilled, (state, action) => {
      state.contractNotes = action.payload;
    });
    builder.addCase(createContractNote.fulfilled, (state, action) => {});
    builder.addCase(generateContractNotePDF.fulfilled, (state, action) => {
      var blob = new Blob([action.payload], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      window.open(url);
    });
  },
});

export const {
  setContractNotes,
  clearNewContractNote,
  setNewContractNote,
  setTempContractNoteProductQuantity,
} = contractNoteSlice.actions;

export default contractNoteSlice.reducer;
