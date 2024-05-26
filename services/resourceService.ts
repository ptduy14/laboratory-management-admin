import AxiosInstance from "@/config/axiosInstance";

export const ResouceService = {
    getAll: async (url: string) => {
        return await AxiosInstance.get(url);
    },
    getByCategory: async (id: string) => {
        return await AxiosInstance.get(`/items/category/${id}`);
    }
}