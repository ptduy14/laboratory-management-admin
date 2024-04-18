import AxiosInstance from "@/config/axiosInstance";

export const RoomService = {
    getAll: async () => {
        return await AxiosInstance.get('/rooms');
    }
}