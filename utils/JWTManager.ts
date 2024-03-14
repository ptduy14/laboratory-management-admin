interface JWTManagerType {
    setToken: (token: string) => void,
    deleteToken: () => void
}

export const JWTManager: JWTManagerType = {
    setToken: (token) => {
        localStorage.setItem("access_token", token);
    },

    deleteToken: () => {
        localStorage.removeItem("access_token")
    }
}