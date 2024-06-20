import { ResourceService } from "@/services/resourceService"

export const resourcesFetcher = async (url: string, queryParams: Object = {}) => {
    const { data } = await ResourceService.getAll(url, queryParams);
    return data;
}