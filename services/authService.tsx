import AxiosInstance from "@/config/axiosConfig";

interface LoginProps {
    email: string,
    password: string,
}

export const AuthService = {
    login: async (payload: LoginProps) => {
        return await AxiosInstance.post("/auths/login", payload);
    },
    getMe: async () => {
        return await AxiosInstance.get("/auths/info")
    }
}