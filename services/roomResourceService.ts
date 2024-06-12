import AxiosInstance from "@/config/axiosInstance"

export const RoomResourceService = {
    transferResource: async (payload: any) => {
       return await AxiosInstance.post(`/room-items/`, payload)
    }
}