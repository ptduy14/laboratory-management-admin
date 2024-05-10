import AxiosInstance from "@/config/axiosInstance";

export const CategoryService = {
    getAll: async () => {
        return await AxiosInstance.get('/categories');
    },
    getById: async (id: string) => {
        return await AxiosInstance.get(`/categories/${id}`);
    }
}