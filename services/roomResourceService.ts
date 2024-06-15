import AxiosInstance from "@/config/axiosInstance";

export const RoomResourceService = {
  getAll: async (url: string) => {
    return await AxiosInstance.get(url);
  },
  transferResource: async (payload: any) => {
    return await AxiosInstance.post(`/room-items/`, payload);
  },
  reTransferResource: async (resourceTransferedId: string, payload: any) => {
    return await AxiosInstance.patch(`/room-items/${resourceTransferedId}`, payload);
  },
  getResourceTransferedById: async (url: string) => {
    return await AxiosInstance.get(url);
  },
  delete: async (resourceTransferedId: string) => {
    return await AxiosInstance.delete(`/room-items/${resourceTransferedId}`);
  },
};
