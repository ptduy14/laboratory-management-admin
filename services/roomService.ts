import { AddRoomSchemaType } from "@/components/rooms/schema/addRoomSchema";
import { UpdateRoomSchemaType } from "@/components/rooms/schema/updateRoomSchema";
import AxiosInstance from "@/config/axiosInstance";

export const RoomService = {
    getAll: async (url : string) => {
        return await AxiosInstance.get(url);
    },
    getById: async (url: string) => {
        return await AxiosInstance.get(url);
    },
    getResourcesFromRoom: async (url: string) => {
        return await AxiosInstance.get(url)
    },
    create: async (payload: AddRoomSchemaType) => {
        return await AxiosInstance.post(`/rooms`, payload)
    },
    update: async (roomId: number, payload: UpdateRoomSchemaType) => {
        return await AxiosInstance.patch(`/rooms/${roomId}`, payload)
    },
    delete: async (roomId: string) => {
        return await AxiosInstance.delete(`/rooms/${roomId}`)
    }
}