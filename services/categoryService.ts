import AxiosInstance from "@/config/axiosInstance";
import { UpdateCategorySchemaType } from "@/components/category/schema/updateCategorySchema";

export const CategoryService = {
    getAll: async (url: string) => {
        return await AxiosInstance.get(url);
    },
    getById: async (url: string) => {
        return await AxiosInstance.get(url);
    },
    update: async (id: number, payload: UpdateCategorySchemaType) => {
        return await AxiosInstance.patch(`/categories/${id}`, payload)
    }
}