import axios, { AxiosRequestConfig } from "axios";
import tokenManager from "./tokenManager";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { AuthService } from "@/services/authService";

// Define the structure of a retry queue item
interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

// Create a list to hold the request queue
const refreshAndRetryQueue: RetryQueueItem[] = [];

// Flag to prevent multiple token refresh requests
let isRefreshing = false;

const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = tokenManager.getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
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
    const originalRequest: AxiosRequestConfig = error.config;
    if (error.response && error.response.status === 401) {
      if (!isRefreshing) {
        const refresh_token = tokenManager.getRefreshToken();
        const email = localStorage.getItem("email");
        isRefreshing = true;
        try {
          console.log("Access token expired");

          // Refresh the access token
          const { data } = await AuthService.refreshToken({ email, refreshToken: refresh_token });

          // reset access-token in local
          localStorage.setItem("access_token", data.token);

          // Update the request headers with the new access token
          error.config.headers["Authorization"] = `Bearer ${data.token}`;

          // Retry all requests in the queue with the new token
          refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
            AxiosInstance.request(config)
              .then((response) => resolve(response))
              .catch((err) => reject(err));
          });

          // Clear the queue
          refreshAndRetryQueue.length = 0;

          // Retry the original request
          return AxiosInstance(originalRequest);
        } catch (error) {
          await signOut({
            redirect: false,
          });
          tokenManager.clearTokens();
          toast.error("Phiên đăng nhập đã hết hạn");
          window.location.href = "/";
        } finally {
          isRefreshing = false;
        }
      }

      // Add the original request to the queue
      return new Promise<void>((resolve, reject) => {
        refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
      });
    }

    console.log(error);
    // Return a Promise rejection if the status code is not 401
    return Promise.reject(error);
  }
);

export default AxiosInstance;
