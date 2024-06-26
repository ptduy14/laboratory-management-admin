import { UserService } from "@/services/userService"

export const accountFetcher = async (url: string) => {
    const { data } = await UserService.getById(url);
    return data
}