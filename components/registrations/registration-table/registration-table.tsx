import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import { RenderCell } from "./render-cell";
import { Registration } from "./data";

interface RegistrationTableWrapperProps {
    registrations: Registration[],
    registrationColumns: {key: string, label: string}[]
}

export const RegistrationTableWrapper = ({registrations, registrationColumns}: RegistrationTableWrapperProps) => {
    return <Table aria-label="Example table with dynamic content">
    <TableHeader>
      {registrationColumns.map((column) =>
        <TableColumn key={column.key}>{column.label}</TableColumn>
      )}
    </TableHeader>
    <TableBody items={registrations}>
        {(registration) => (
          <TableRow key={registration.id}>
            {(columnKey) => <TableCell>{RenderCell({registration, columnKey: columnKey})}</TableCell>}
          </TableRow>
        )}
      </TableBody>
  </Table>
}