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
    // Do something with response error
    let messageError = "";

    if (error.response) {
      switch (error.response.status) {
        case 400:
          messageError =
            "Invalid data, please recheck your information and try again!";
          break;
        case 401:
          messageError =
            "This resource is for authenticated user only. Please login to your account!";
          break;
        case 403:
          messageError = "Access Denied!";
          break;
        case 500:
          messageError =
            "Sorry, there were some technical issue on our side. Please try again later.";
          break;
        default:
          messageError = "Something went wrong!";
          break;
      }
    }

    return Promise.reject({
      ...error.response,
      statusText: messageError,
    });
  }
);

export default API;
