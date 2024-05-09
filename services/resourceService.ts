import AxiosInstance from "@/config/axiosInstance";

export const ResouceService = {
    getAll: async () => {
        return await AxiosInstance.get('/items/');
    }
}