const tokenManager = {
  getAccessToken: () => {
    return localStorage.getItem("access_token");
  },
  getRefreshToken: () => {
    return localStorage.getItem("refresh_token");
  },
  setTokens: (access_token: string, refresh_token: string) => {
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
  },
  clearTokens: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
};

export default tokenManager;
