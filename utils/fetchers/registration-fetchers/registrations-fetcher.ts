import { RegistrationService } from "@/services/registrationService"

export const registrationsFetcher = async (url: string, queryParams: Object = {}) => {
    const { data } = await RegistrationService.getAll(url, queryParams);
    return data
}