import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Card,
  CardBody,
} from "@nextui-org/react";
import React from "react";
import { ResourceService } from "@/services/resourceService";
import useSWR from "swr";
import { Resource } from "../resoures/resource-table/data";
import { CardLoaderSpinner } from "../loader/card-loader-spiner";
import { resourcesFetcher } from "@/utils/fetchers/resource-fetchers.ts/resources-fetcher";

export const resourceCardColumns = [
  {
    key: "name",
    label: "TÊN",
  },
  {
    key: "origin",
    label: "XUẤT XỨ",
  },
  {
    key: "specification",
    label: "DUNG TÍCH",
  },
];

export const CardAgents = () => {
  const {
    data: resources,
    isLoading: isFetchingResouces,
    mutate: updateResourceList,
  } = useSWR([`/items`, {take: 8}], ([url, queryParams]) => resourcesFetcher(url, queryParams));

  return (
    <Card className="bg-default-50 rounded-xl shadow-md w-full">
      {isFetchingResouces ? (
       <div className="min-h-52">
       <CardLoaderSpinner />
   </div>
      ) : (
        <CardBody className="gap-6">
          <Table aria-label="Example table with dynamic content">
            <TableHeader>
              {resourceCardColumns.map((column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {resources.data.map((resource: Resource) => (
                <TableRow key={resource.id}>
                  {(columnKey) => <TableCell>{getKeyValue(resource, columnKey) ? getKeyValue(resource, columnKey) : "-"}</TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      )}
    </Card>
  );
};
