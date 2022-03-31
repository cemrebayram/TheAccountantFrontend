import axios from "axios";
import store from "../store/store";
import { clearUser } from "../store/slices/userSlice";

const devUrl = "http://localhost:3002";
const prodUrl = "https://theaccountant-backend.herokuapp.com"

const instance = axios.create({
  baseURL: prodUrl,
});

instance.interceptors.request.use((config) => {
  const token = store.getState().user.token; 
  if (token) {
    config.headers.token = token;
  }
  return config;
});
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status == 401) {
      console.log("401");
      store.dispatch(clearUser());
    }
  }
);

export default instance;
