import { ResourcesTransfered } from "./data";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";
import { RenderCell } from "./render-cell";
import { metaType } from "@/types/meta";

interface RoomResourcesTableWrapperProps {
  columns: { key: string; label: string }[],
  resourcesTransfered: ResourcesTransfered[],
  meta: metaType;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
}

export const RoomResourcesTableWrapper = ({
  columns,
  resourcesTransfered,
  meta,
  setPage
}: RoomResourcesTableWrapperProps) => {
  return (
    <Table aria-label="Example static collection table" bottomContentPlacement="outside"
    bottomContent={
      <div className="flex w-full justify-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={meta.page}
          total={meta.pages}
          onChange={(newPage) => setPage && setPage(newPage)}
        />
      </div>
    }>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key} width={column.key === "name" ? "15%" : undefined}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={resourcesTransfered} emptyContent={"No resource found"}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{RenderCell({ resouceTransfered: item, columnKey: columnKey })}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
