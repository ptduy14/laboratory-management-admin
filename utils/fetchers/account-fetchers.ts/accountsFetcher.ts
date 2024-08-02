import { AccountService } from "@/services/accountService";

export const accountsFetcher = async (url: string, queryParams: Object = {}) => {
    const { data } = await AccountService.getAll(url, queryParams)
    return data;
}