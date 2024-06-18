import AxiosInstance from "@/config/axiosInstance";
import { UpdateAccountSchemaType } from "@/components/accounts/schema/updateAccountSchema";

export const UserService = {
  getAll: async (url: string, queryParams: Object) => {
    return await AxiosInstance.get(url, {params: queryParams});
  },
  getById: async (url: string) => {
    return await AxiosInstance.get(url);
  },
  updateById: async (id: string, payload: UpdateAccountSchemaType) => {
    return await AxiosInstance.patch("/users/update/" + id, payload)
  }
};
