import { AccountService } from "@/services/accountService";

export const accountFetcher = async (url: string) => {
    const { data } = await AccountService.getById(url);
    return data
}