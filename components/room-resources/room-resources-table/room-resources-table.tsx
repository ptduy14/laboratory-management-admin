import { ResourcesTransfered } from "./data";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { RenderCell } from "./render-cell";

interface RoomResourcesTableWrapperProps {
  columns: { key: string; label: string }[];
  resourcesTransfered: ResourcesTransfered[];
}

export const RoomResourcesTableWrapper = ({
  columns,
  resourcesTransfered,
}: RoomResourcesTableWrapperProps) => {
  return (
    <Table aria-label="Example static collection table" bottomContentPlacement="outside">
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
