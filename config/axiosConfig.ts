import axios from "axios";

export default function axiosConfig(token = null) {
  axios.defaults.baseURL = process.env.API_URL;
  axios.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );
}
