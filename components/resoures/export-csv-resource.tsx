import { Button } from "@nextui-org/react";
import { ExportIcon } from "../icons/accounts/export-icon";
import useSWR from "swr";
import { ResourceService } from "@/services/resourceService";
import { Resource } from "./resource-table/data";
import { getCurrentDate } from "@/utils/getCurrentDate";
import { UnitEnumNames } from "@/enums/unit";
import { ResourceStatusName } from "@/enums/resource-status";

export const ExportCSVResource = () => {
  const { data: resources, isLoading } = useSWR(`/items?take=50`, async (url: string) => {
    const { data } = await ResourceService.getAll(url);
    return data;
  });

  const handleDownloadCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Tên thiết bị,Xuất xứ,số seri,Dung tích, Chú thích, Số lượng, Đã bàn giao, Chưa bàn giao, Đơn vị, Trạng thái, Danh mục\n" +
      resources.data
        .map(
          (resource: Resource) =>
            `"${resource.name}", "${resource.origin}", "${resource.serial_number}", "${resource.specification}", "${resource.remark}", "${resource.quantity}", "${resource.handover}", "${resource.quantity - resource.handover}", "${UnitEnumNames[resource.unit]}", "${ResourceStatusName[resource.status]}", "${resource.category.name}"`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `resource_list_${getCurrentDate()}.csv`);
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
