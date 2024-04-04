const jwtManager = {
  getToken: () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem("access_token");
    }
  },
  setToken: (token: string) => {
    return localStorage.setItem("access_token", token);
  },
  clearToken: () => {
    return localStorage.removeItem("access_token");
  },
};

export default jwtManager;
