import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    user: {
      name: "",
      username: "",
      companyName: "",
      address: "",
      uid: "",
      bankAccount: "",
      telefon: "",
      email: "",
    },
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.token = "";
      state.user = {
        name: "",
        username: "",
        companyName: "",
        address: "",
        uid: "",
        bankAccount: "",
        telefon: "",
        email: "",
      };
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    },
  },
});

export const { setToken, setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
