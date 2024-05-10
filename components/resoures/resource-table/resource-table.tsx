import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { ResourceType, resourceColumns } from "./data";
import { RenderCell } from "./render-cell";
import { useState, useMemo } from "react";

interface Column {
  key: string;
  label: string;
}

interface RecoureTableProps {
  resources: ResourceType[];
  columns?: Column[];
}

export const ResourceTableWrapper = ({ resources, columns = resourceColumns }: RecoureTableProps) => {
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
      }
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={items} emptyContent={"No resource found"}>
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
