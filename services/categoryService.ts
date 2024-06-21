import AxiosInstance from "@/config/axiosInstance";
import { UpdateCategorySchemaType } from "@/components/category/schema/updateCategorySchema";
import { AddCategorySchemaType } from "@/components/category/schema/addCategorySchema";
import { QueryParams } from "@/types/query-params";

export const CategoryService = {
    getAll: async (url: string, queryParams: QueryParams) => {
        return await AxiosInstance.get(url, {params: queryParams});
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