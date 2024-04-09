import AxiosInstance from "@/config/axiosInstance";

export const UserService = {
  getAll: async () => {
    return await AxiosInstance.get("/users/get");
  },
  getById: async (id: string) => {
    return await AxiosInstance.get("/users/get/" + id);
  }
};
