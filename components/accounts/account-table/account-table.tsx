import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { columns, Account } from "./data";
import { RenderCell } from "./render-cell";
import { metaType } from "@/types/meta";

interface AccountTableProps {
  accounts: Account[];
  paginate: boolean;
  meta?: metaType;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
}

export const AccountTableWrapper = ({
  accounts,
  paginate,
  meta,
  setPage,
}: AccountTableProps) => {
  return (
    <Table
      aria-label="Example static collection table"
      bottomContentPlacement="outside"
      bottomContent={
        paginate ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={meta?.page}
              total={meta?.pages ? meta?.pages : 0}
              onChange={(page) => {
                if (setPage) {
                  setPage(page);
                }
              }}
            />
          </div>
        ) : null
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={accounts} emptyContent={"No account found"}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {RenderCell({
                  account: item,
                  columnKey: columnKey,
                })}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
