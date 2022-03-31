import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import userSlice from "./slices/userSlice";
import customerSlice from "./slices/customerSlice";
import todoSlice from "./slices/todoSlice";
import productSlice from "./slices/productSlice";
import offerSlice from "./slices/offerSlice";
import contractNoteSlice from "./slices/contractNoteSlice";
import invoiceSlice from "./slices/invoiceSlice";

const reducers = combineReducers({
  user: userSlice,
  customer: customerSlice,
  todo: todoSlice,
  product: productSlice,
  offer: offerSlice,
  contractNote: contractNoteSlice,
  invoice: invoiceSlice,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    whitelist: ["user"],
  },
  reducers
);
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
