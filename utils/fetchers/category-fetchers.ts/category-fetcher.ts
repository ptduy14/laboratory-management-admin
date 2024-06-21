import { CategoryService } from "@/services/categoryService"

export const categoryFetcher = async (url: string) => {
    const { data } = await CategoryService.getById(url)
    return data;
}