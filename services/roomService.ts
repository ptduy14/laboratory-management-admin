import AxiosInstance from "@/config/axiosInstance";

export const RoomService = {
    getAll: async (url : string) => {
        return await AxiosInstance.get(url);
    }
}