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

API.interceptors.request.use(async function (config) {
  return config;
}, function (error) {
  // Do something with request error
  // toast.error(error?.response?.data?.message);
  return error;
});

// Add a response interceptor
API.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Không có phản hồi (504 từ ingress bị chặn CORS, mất mạng, quá thời gian): trả về khung
    // `{ data: { error, message } }` thay vì `undefined` — trước đây mọi nơi `const { data } = await API...`
    // nổ "Cannot read properties of undefined (reading 'data')", che mất lý do thật (2026-10-19, xuất Excel doanh số).
    if (!error?.response) {
      const message = 'Máy chủ không phản hồi kịp (quá thời gian hoặc mất kết nối). Vui lòng thử lại hoặc chọn khoảng ngày ngắn hơn.';
      toast.error(message);
      return { status: 0, data: { error: true, message } };
    }

    const errorMessage = ['jwt expired', 'user_blocked'];

    if(errorMessage.includes(error?.response?.data?.message)) {
      localStorage.clear();
      window.location.replace('/login');
    } else{
      toast.error(error?.response?.data?.message);
    }

    return error.response;
  }
);

export default API;