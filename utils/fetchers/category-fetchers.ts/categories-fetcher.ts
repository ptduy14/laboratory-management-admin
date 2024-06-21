import { CategoryService } from "@/services/categoryService"
import { QueryParams } from "@/types/query-params";

export const categoriesFetcher = async (url: string, queryParams: QueryParams = {}) => {
    const { data } = await CategoryService.getAll(url, queryParams);
    return data;
}