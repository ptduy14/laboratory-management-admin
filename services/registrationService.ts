import AxiosInstance from "@/config/axiosInstance";

export const RegistrationService = {
  getAll: async (url: string, queryParams: Object) => {
    return AxiosInstance.get(url, { params: queryParams });
  },
  getById: async (url: string) => {
    return AxiosInstance.get(url);
  },
};
