import AxiosInstance from "@/config/axiosInstance";

export const ResouceService = {
    getAll: async () => {
        return await AxiosInstance.get('/items/');
    },
    getByCategory: async (id: string) => {
        return await AxiosInstance.get(`/items/category/${id}`);
    }
}