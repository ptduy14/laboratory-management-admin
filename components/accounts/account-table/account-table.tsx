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
import { useSession } from "next-auth/react";

interface AccountTableProps {
  accounts: Account[];
  paginate: boolean;
  meta?: metaType;
  setQueryParams?: React.Dispatch<React.SetStateAction<Object>>;
}

export const AccountTableWrapper = ({
  accounts,
  paginate,
  meta,
  setQueryParams,
}: AccountTableProps) => {
  const { data: session } = useSession();
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
                if (setQueryParams) {
                  setQueryParams((prev) => ({
                    ...prev,
                    page: page
                  }))
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
