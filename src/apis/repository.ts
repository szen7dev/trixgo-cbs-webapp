import Axios from "axios";

const API = Axios.create({
  baseURL: process.env.REACT_APP_API_DOMAIN,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add a response interceptor
API.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    return error.response;
  }
);

export default API;
