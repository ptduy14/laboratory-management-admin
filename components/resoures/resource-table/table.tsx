import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { ResourceType, columns } from "./data";
import { RenderCell } from "./render-cell";
import { useState, useMemo } from "react";

interface TableRecoureProps {
  resources: ResourceType[];
}

export const TableWrapper = ({ resources }: TableRecoureProps) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 14;

  const pages = Math.ceil(resources.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return resources.slice(start, end);
  }, [page, resources]);
  return (
    <Table
      aria-label="Example static collection table"
      bottomContentPlacement="outside"
      bottomContent={
        <div className="position: relative">
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
          <span className="position: absolute right-0 top-0 text-xs text-[#A1A1AA]">
            Tổng số sản phẩm - tài nguyên của hệ thống: {resources.length}
          </span>
        </div>
      }
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {RenderCell({ resouce: item, columnKey: columnKey })}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
