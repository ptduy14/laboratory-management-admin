import { AddRoomSchemaType } from "@/components/rooms/schema/addRoomSchema";
import { UpdateRoomSchemaType } from "@/components/rooms/schema/updateRoomSchema";
import AxiosInstance from "@/config/axiosInstance";
import { QueryParams } from "@/types/query-params";

export const RoomService = {
    getAll: async (url : string, queryParams: QueryParams) => {
        return await AxiosInstance.get(url, {params: queryParams});
    },
    getById: async (url: string) => {
        return await AxiosInstance.get(url);
    },
    getResourcesFromRoom: async (url: string, queryParams: QueryParams) => {
        return await AxiosInstance.get(url, {params: queryParams})
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