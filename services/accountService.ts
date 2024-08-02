import AxiosInstance from "@/config/axiosInstance";
import { AddAccountSchemaType } from "@/components/accounts/schema/addAccountSchema";
import { UpdateAccountSchemaType } from "@/components/accounts/schema/updateAccountSchema";

export const AccountService = {
  getAll: async (url: string, queryParams: Object) => {
    return await AxiosInstance.get(url, { params: queryParams });
  },
  getById: async (url: string) => {
    return await AxiosInstance.get(url);
  },
  updateById: async (id: string, payload: UpdateAccountSchemaType) => {
    return await AxiosInstance.patch("/users/update/" + id, payload);
  },
  create: async (payload: AddAccountSchemaType) => {
    return await AxiosInstance.post("/auths/" + payload.role + "-create", payload);
  },
  delete: async (accountId: string) => {
    return await AxiosInstance.delete(`/users/${accountId}`);
  },
};
