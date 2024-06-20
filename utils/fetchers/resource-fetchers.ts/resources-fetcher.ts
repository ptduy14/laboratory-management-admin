import { ResourceService } from "@/services/resourceService"
import { QueryParams } from "@/types/query-params";

export const resourcesFetcher = async (url: string, queryParams: QueryParams = {}) => {
    const { data } = await ResourceService.getAll(url, queryParams);
    return data;
}