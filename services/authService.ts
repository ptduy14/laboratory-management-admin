import axios from "axios";

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
    return await axios.post("/auths/login", payload);
  },
  verifyTokenFromGoogleLogin: async (payload: GoogleLoginData) => {
    return await axios.post("/auths/google-login", payload);
  },
};
