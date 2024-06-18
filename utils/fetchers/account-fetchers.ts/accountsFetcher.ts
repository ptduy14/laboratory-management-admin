import { UserService } from "@/services/userService"

export const accountsFetcher = async (url: string, queryParams: Object = {}) => {
    const { data } = await UserService.getAll(url, queryParams)
    return data;
}