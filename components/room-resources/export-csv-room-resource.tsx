import { Button } from "@nextui-org/react";
import { ExportIcon } from "../icons/accounts/export-icon";
import useSWR from "swr";
import { ResourcesTransfered } from "./room-resources-table/data";
import { getCurrentDate } from "@/utils/getCurrentDate";
import { UnitEnumNames } from "@/enums/unit";
import { ResourceStatusName } from "@/enums/resource-status";
import { RoomService } from "@/services/roomService";
import { formatDateTime } from "@/utils/formatDateTime";

export const ExportCSVRoomResource = ({ roomId }: {roomId: string}) => {
  const { data: resources, isLoading } = useSWR(`/room-items/room/${roomId}?take=50`, async (url: string) => {
    const { data } = await RoomService.getResourcesFromRoom(url);
    return data;
  });

  const handleDownloadCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Tên tài nguyên,Xuất xứ,số seri,Dung tích, Chú thích, Số lượng, Đã mượn, Đã trả, Đơn vị, Trạng thái, Ngày bàn giao, Giờ bàn giao\n" +
      resources.data
        .map(
          (resource: ResourcesTransfered) =>
            `"${resource.item.name}", "${resource.item.origin}", "${resource.item.serial_number}", "${resource.item.specification}", "${resource.remark}", "${resource.quantity}", "${resource.itemQuantityBorrowed}", "${resource.itemQuantityReturned}", "${UnitEnumNames[resource.item.unit]}", "${ResourceStatusName[resource.item.status]}", "${formatDateTime(resource.createdAt).formattedDate}", "${formatDateTime(resource.createdAt).formattedTime}"`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `room_resource_list_${getCurrentDate()}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  if (isLoading) return <></>;

  return (
    <Button color="primary" startContent={<ExportIcon />} onClick={handleDownloadCSV}>
      Export to CSV
    </Button>
  );
};
