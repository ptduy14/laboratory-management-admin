import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: 'https://laboratory-management-system.onrender.com/apis',
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default AxiosInstance;