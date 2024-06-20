import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { Resource, resourceColumns } from "./data";
import { RenderCell } from "./render-cell";
import { useState, useMemo } from "react";
import { metaType } from "@/types/meta";
import { QueryParams } from "@/types/query-params";

interface RecoureTableProps {
  resources: Resource[];
  meta: metaType;
  setPage?: React.Dispatch<React.SetStateAction<QueryParams>>;
  columns?: { key: string; label: string }[];
}

export const ResourceTableWrapper = ({
  resources,
  meta,
  setPage,
  columns,
}: RecoureTableProps) => {
  return (
    <Table
      aria-label="Example static collection table"
      bottomContentPlacement="outside"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={meta.page}
            total={meta.pages}
            onChange={(page) => {
              if (setPage) {
                setPage((prev) => ({
                  ...prev,
                  page: page
                }))
              }
            }}
          />
        </div>
      }>
      <TableHeader columns={columns ? columns : resourceColumns}>
        {(column) => <TableColumn key={column.key} width={column.key === "name" ? "15%" : undefined}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={resources} emptyContent={"No resource found"}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{RenderCell({ resouce: item, columnKey: columnKey })}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
