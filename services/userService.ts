import AxiosInstance from "@/config/axiosInstance";

export const UserService = {
  getAll: async () => {
    return await AxiosInstance.get("/users/get");
  },
};
