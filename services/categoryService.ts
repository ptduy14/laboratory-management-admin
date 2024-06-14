import AxiosInstance from "@/config/axiosInstance";
import { UpdateCategorySchemaType } from "@/components/category/schema/updateCategorySchema";
import { AddCategorySchemaType } from "@/components/category/schema/addCategorySchema";

export const CategoryService = {
    getAll: async (url: string) => {
        return await AxiosInstance.get(url);
    },
    getById: async (url: string) => {
        return await AxiosInstance.get(url);
    },
    create: async (payload: AddCategorySchemaType) => {
        return await AxiosInstance.post('/categories', payload)
    },
    update: async (id: number, payload: UpdateCategorySchemaType) => {
        return await AxiosInstance.patch(`/categories/${id}`, payload)
    },
    delete: async (categoryId: string) => {
        return await AxiosInstance.delete(`/categories/${categoryId}`)
    }
}