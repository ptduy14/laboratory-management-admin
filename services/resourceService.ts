import AxiosInstance from "@/config/axiosInstance";
import { AddResourceSchemaUnion } from "@/components/resoures/schema/addResourceSchema";

export const ResouceService = {
    getAll: async (url: string) => {
        return await AxiosInstance.get(url);
    },
    getByCategory: async (url: string) => {
        return await AxiosInstance.get(url);
    },
    create: async (payload: AddResourceSchemaUnion) => {
        return await AxiosInstance.post('/items', payload)
    }
}