import AxiosInstance from "@/config/axiosInstance";

export const CategoryService = {
    getAll: async () => {
        return await AxiosInstance.get('/categories');
    }
}