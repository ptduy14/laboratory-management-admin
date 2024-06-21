import { CategoryService } from "@/services/categoryService";
import { ResourceService } from "@/services/resourceService";
import { QueryParams } from "@/types/query-params";

export const categoryResourcesFetcher = async (url: string, queryParams: QueryParams = {}) => {
    const { data } = await ResourceService.getByCategory(url, queryParams);
    return data;
}