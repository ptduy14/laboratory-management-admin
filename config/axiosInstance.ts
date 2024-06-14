import axios from "axios";
import jwtManager from "./jwtManager";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const access_token = jwtManager.getToken();
    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    // console.log(error)
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      await signOut({
        redirect: false,
      });
      jwtManager.clearToken();
      if (typeof window !== "undefined") {
        toast.error("Phiên đăng nhập đã hết hạn")
        window.location.href = "/";
      }
    }
    console.log(error.response);
    return Promise.reject(error);
  }
);

export default AxiosInstance;
