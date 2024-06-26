import { RegistrationDetail } from "@/components/registrations/registration-table/data";
import { roomResourceFetcher } from "../room-resource-fetchers/room-resource-fetch";
import { ResourcesTransfered } from "@/components/room-resources/room-resources-table/data";

export const fetchAllRegistrationResources = async (
  key: string,
  registrationDetail: RegistrationDetail | undefined
): Promise<ResourcesTransfered[] | undefined> => {
  if (!registrationDetail) return undefined;

  try {
    const registrationResources = await Promise.all(
        registrationDetail.items.map(async (item) => {
        const data = await roomResourceFetcher(`/room-items/${item.roomItem.id}`);
        return data;
      })
    );

    return registrationResources;
  } catch (error) {
    console.error("Error fetching registration resources:", error);
    return undefined; // Trả về undefined nếu có lỗi
  }
};
