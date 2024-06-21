import { RoomResourceService } from "@/services/roomResourceService"

export const roomResourceFetcher = async (url: string) => {
    const { data } = await RoomResourceService.getResourceTransferedById(url);
    return data;
}