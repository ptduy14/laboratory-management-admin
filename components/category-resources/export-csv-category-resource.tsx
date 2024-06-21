import { Button } from "@nextui-org/react";
import { ExportIcon } from "../icons/accounts/export-icon";
import useSWR from "swr";
import { ResourceService } from "@/services/resourceService";
import { Resource } from "../resoures/resource-table/data";
import { getCurrentDate } from "@/utils/getCurrentDate";
import { UnitEnumNames } from "@/enums/unit";
import { ResourceStatusName } from "@/enums/resource-status";
import { categoryResourcesFetcher } from "@/utils/fetchers/category-resource-fetchers/category-resources-fetcher";

export const ExportCSVCategoryResource = ({ categoryId }: {categoryId: string}) => {
    const { data: resources, isLoading } = useSWR([`/items/category/${categoryId}`, {take: 50}], ([url, queryParams]) => categoryResourcesFetcher(url, queryParams));

      const handleDownloadCSV = () => {
        const csvContent =
          "data:text/csv;charset=utf-8," +
          "Tên thiết bị,Xuất xứ,số seri,Dung tích, Chú thích, Số lượng, Đã bàn giao, Chưa bàn giao, Đơn vị, Trạng thái\n" +
          resources.data
            .map(
              (resource: Resource) =>
                `"${resource.name}", "${resource.origin}", "${resource.serial_number}", "${resource.specification}", "${resource.remark}", "${resource.quantity}", "${resource.handover}", "${resource.quantity - resource.handover}", "${UnitEnumNames[resource.unit]}", "${ResourceStatusName[resource.status]}"`
            )
            .join("\n");
    
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `category_resource_list_${getCurrentDate()}.csv`);
        document.body.appendChild(link);
        link.click();
      };
    
      if (isLoading) return <></>;
    
      return (
        <Button color="primary" startContent={<ExportIcon />} onClick={handleDownloadCSV}>
          Export to CSV
        </Button>
      );
}