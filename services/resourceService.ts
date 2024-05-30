import AxiosInstance from "@/config/axiosInstance";

export const ResouceService = {
    getAll: async (url: string) => {
        return await AxiosInstance.get(url);
    },
    getByCategory: async (url: string) => {
        return await AxiosInstance.get(url);
    }
}