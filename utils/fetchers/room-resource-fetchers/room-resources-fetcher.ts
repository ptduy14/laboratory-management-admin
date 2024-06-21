import { RoomService } from "@/services/roomService";
import { QueryParams } from "@/types/query-params";

export const roomResourcesFetcher = async (url: string, queryParams: QueryParams = {}) => {
    const { data } = await RoomService.getResourcesFromRoom(url, queryParams);
    return data;
}