import { RoomService } from "@/services/roomService";

export const roomFetcher = async (url: string) => {
    const { data } = await RoomService.getById(url);
    return data
}