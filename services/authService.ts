import AxiosInstance from "@/config/axiosInstance";

interface LoginData {
  email: string | undefined;
  password: string | undefined;
}

export interface GoogleLoginData {
  email: string;
  firstName: string | undefined;
  lastName: string | undefined;
  photo: string | undefined;
  accessToken: string;
}

export const AuthService = {
  login: async (payload: LoginData) => {
    return await AxiosInstance.post("/auths/login", payload);
  },
  ggAccessTokenVerify: async (payload: GoogleLoginData) => {
    return await AxiosInstance.post("/auths/google-login", payload);
  },
  getMe: async () => {
    return await AxiosInstance.get("/users/info");
  },
  refreshToken: async (payload: {email: string | null, refreshToken: string | null}) => {
    return await AxiosInstance.post("/auths/refresh-token", payload)
  },
  logout: async () => {
    return await AxiosInstance.get("/auths/logout");
  },
};
