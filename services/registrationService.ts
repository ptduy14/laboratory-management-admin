import { ReturnRegistrationchemaType } from "@/components/registrations/schema/return-resource-registration";
import AxiosInstance from "@/config/axiosInstance";

export const RegistrationService = {
  getAll: async (url: string, queryParams: Object) => {
    return AxiosInstance.get(url, { params: queryParams });
  },
  getById: async (url: string) => {
    return AxiosInstance.get(url);
  },
  approveRegistrations: (payload: any) => {
    return AxiosInstance.post('/registration/update-status', payload)
  },
  returnResource: async (payload: ReturnRegistrationchemaType) => {
    return AxiosInstance.post('/item-returning', payload);
  },
};
