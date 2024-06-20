import AxiosInstance from "@/config/axiosInstance";
import { AddResourceSchemaUnionType } from "@/components/resoures/schema/addResourceSchema";
import { UpdateResourceSchemaUnionType } from "@/components/resoures/schema/updateResourceSchema";

export const ResourceService = {
    getAll: async (url: string, queryParams: Object) => {
        return await AxiosInstance.get(url, {params: queryParams});
    },
    getById: async (url: string) => {
        return await AxiosInstance.get(url)
    },
    getByCategory: async (url: string) => {
        return await AxiosInstance.get(url);
    },
    create: async (payload: AddResourceSchemaUnionType) => {
        return await AxiosInstance.post('/items', payload)
    },
    update: async (resourceId: number, payload: UpdateResourceSchemaUnionType) => {
        return await AxiosInstance.patch(`/items/${resourceId}`, payload);
    },
    delete: async (resourceId: string) => {
        return await AxiosInstance.delete(`/items/${resourceId}`)
    }
}