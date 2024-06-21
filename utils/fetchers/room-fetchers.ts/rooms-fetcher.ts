import { RoomService } from "@/services/roomService";
import { QueryParams } from "@/types/query-params";

export const roomsFetcher = async (url: string, queryParams: QueryParams = {}) => {
    const { data } = await RoomService.getAll(url, queryParams);
    return data;
}