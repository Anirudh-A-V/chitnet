import axios from "axios";
import Cookies from "js-cookie";

const defaultOptions = {
  baseURL: process.env.NEXT_PUBLIC_API_URI,
};

let axiosInstance = axios.create(defaultOptions);

axiosInstance.interceptors.request.use(function (config) {
  // const token = localStorage.getItem("token");
  const admin = Cookies.get("admin");

  let token;
  if (admin) {
    const parsedValue = JSON.parse(admin);
    token = parsedValue.token;
  }

  // check if token exist in localStorage
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default axiosInstance;