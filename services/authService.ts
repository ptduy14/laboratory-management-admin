import axios from "axios";

interface LoginData {
    email: string | undefined,
    password: string | undefined
}

export const AuthService = {
    login: async (payload: LoginData) => {
        return await axios.post("/auths/login", payload)
    },
}