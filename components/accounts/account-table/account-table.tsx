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

interface AccountTableProps {
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  accounts: Account[];
  paginate: boolean;
}

export const AccountTableWrapper = ({
  setAccounts,
  accounts,
  paginate,
}: AccountTableProps) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(accounts.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return accounts.slice(start, end);
  }, [page, accounts]);

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
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
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
      <TableBody items={items} emptyContent={"No account found"}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {RenderCell({
                  account: item,
                  columnKey: columnKey,
                  setAccounts: setAccounts,
                })}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
