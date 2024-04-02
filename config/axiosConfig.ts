import axios from "axios";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export default function axiosConfig(access_token = null) {
  axios.defaults.baseURL = process.env.API_URL;
  axios.interceptors.request.use(
    (config) => {
      if (access_token) {
        config.headers["Authorization"] = "Bearer " + access_token;
      }
      return config;
    },
    (error) => {
      if (error.response && error?.response?.data?.statusCode === 401 && access_token) {
        document.cookie = "next-auth.session-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
        toast.error("Phiên đăng nhập đã hết hạn !!")
        redirect("/login");
      }
      return Promise.reject(error);
    }
  );
}
