import AxiosInstance from "@/config/axiosInstance";
import { UpdateAccountSchemaType } from "@/components/accounts/schema/updateAccountSchema";

export const UserService = {
  getAll: async () => {
    return await AxiosInstance.get("/users/get");
  },
  getById: async (id: string) => {
    return await AxiosInstance.get("/users/get/" + id);
  },
  updateById: async (id: string, payload: UpdateAccountSchemaType) => {
    return await AxiosInstance.patch("/users/update/" + id, payload)
  }
};
