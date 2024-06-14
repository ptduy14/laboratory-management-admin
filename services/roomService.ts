import { UpdateRoomSchemaType } from "@/components/rooms/schema/updateRoomSchema";
import AxiosInstance from "@/config/axiosInstance";

export const RoomService = {
    getAll: async (url : string) => {
        return await AxiosInstance.get(url);
    },
    update: async (roomId: number, payload: UpdateRoomSchemaType) => {
        return await AxiosInstance.patch(`/rooms/${roomId}`, payload)
    }
}