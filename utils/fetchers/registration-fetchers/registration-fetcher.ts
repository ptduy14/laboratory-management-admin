import { RegistrationService } from "@/services/registrationService"

export const registrationFetcher = async (url: string) => {
    const { data } = await RegistrationService.getById(url)
    return data
}