import { ResourceService } from "@/services/resourceService"

export const resourceFetcher = async (url: string) => {
    const { data } = await ResourceService.getById(url);
    return data
}