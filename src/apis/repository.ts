import Axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = process.env.REACT_APP_ENV === 'development' 
  ? process.env.REACT_APP_API_DOMAIN_LOCAL
  : process.env.REACT_APP_API_DOMAIN_STAGING;

const API = Axios.create({
  baseURL: BASE_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  data: {}
});

// Add a response interceptor
API.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    toast.error(error?.response?.data?.message);
    return error.response;
  }
);

export default API;