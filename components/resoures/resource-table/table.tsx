import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue
} from "@nextui-org/react";
import { ResourceType, columns } from "./data";
import { RenderCell } from "./render-cell";

interface TableRecoureProps {
    resources: ResourceType[]
}

export const TableWrapper = ({resources} : TableRecoureProps) => {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader columns={columns}>
      {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={resources}>
        {(item) => (
            <TableRow key={item.id}>
               {(columnKey) => <TableCell>{RenderCell({ resouce: item, columnKey: columnKey })}</TableCell>}
            </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
