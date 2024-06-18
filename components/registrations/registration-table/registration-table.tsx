import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Pagination,
} from "@nextui-org/react";
import { RenderCell } from "./render-cell";
import { Registration } from "./data";
import { metaType } from "@/types/meta";

interface RegistrationTableWrapperProps {
  registrations: Registration[];
  registrationColumns: { key: string; label: string }[];
  meta: metaType;
  setQueryParams?: React.Dispatch<React.SetStateAction<Object>>;
}

export const RegistrationTableWrapper = ({
  registrations,
  registrationColumns,
  meta,
  setQueryParams,
}: RegistrationTableWrapperProps) => {
  return (
    <Table
      aria-label="Example table with dynamic content"
      bottomContentPlacement="outside"
      bottomContent={
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
                  page: page,
                }));
              }
            }}
          />
        </div>
      }>
      <TableHeader>
        {registrationColumns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody items={registrations}>
        {(registration) => (
          <TableRow key={registration.id}>
            {(columnKey) => (
              <TableCell>{RenderCell({ registration, columnKey: columnKey })}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
