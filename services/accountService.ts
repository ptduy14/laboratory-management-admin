import AxiosInstance from "@/config/axiosInstance";
import { AddAccountSchemaType } from "@/components/accounts/schema/addAccountSchema";

export const AccountService = {
    createAccount: async (payload: AddAccountSchemaType) => {
        return await AxiosInstance.post('/auths/' + payload.role + '-create', payload);
    }
}