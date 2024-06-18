import {
  Avatar,
  Card,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import React from "react";
import { RoomResourceService } from "@/services/roomResourceService";
import useSWR from "swr";
import { ResourcesTransfered } from "../room-resources/room-resources-table/data";
import { formatDateTime } from "@/utils/formatDateTime";
import { CardLoaderSpinner } from "../loader/card-loader-spiner";

const columns = [
  {
    key: "name",
    label: "Tên tài nguyên",
  },
  {
    key: "quantity",
    label: "Số lượng",
  },
  {
    key: "createdAt",
    label: "Ngày bàn giao",
  },
];

const renderCell = ({ item, columnKey }: { item: ResourcesTransfered; columnKey: any }) => {
  // @ts-ignore
  const cellValue = item[columnKey];

  switch (columnKey) {
    case "name":
      return item.item.name;

    case "createdAt":
      return formatDateTime(cellValue).formattedDate;

    default:
      break;
  }

  return cellValue;
};

export const CardTransactions = () => {
  const { data: resourceTransfered, isLoading: isFetchingresourceTransfered } = useSWR(
    `/room-items?take=5&order=DESC`,
    async (url) => {
      const { data } = await RoomResourceService.getAll(url);
      return data;
    }
  );

  return (
    <Card className="bg-default-50 rounded-xl shadow-md">
      <CardBody className="gap-4">
        <div className="flex gap-2.5 justify-center">
          <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
            <span className="text-default-900 text-xl font-semibold">
              Tài nguyên mới bàn giao gần đây
            </span>
          </div>
        </div>

        {isFetchingresourceTransfered ? (
          <div className="min-h-40">
              <CardLoaderSpinner />
          </div>
        ) : (
          <Table aria-label="Example table with dynamic content">
            <TableHeader columns={columns}>
              {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={resourceTransfered.data}>
              {(item: ResourcesTransfered) => (
                <TableRow key={item.id}>
                  {(columnKey) => <TableCell>{renderCell({ item, columnKey })}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardBody>
    </Card>
  );
};
