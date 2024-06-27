import React, { useState } from "react";
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
import { QueryParams } from "@/types/query-params";

interface RegistrationTableWrapperProps {
  registrations: Registration[];
  registrationColumns: { key: string; label: string }[];
  meta: metaType;
  setPage?: React.Dispatch<React.SetStateAction<QueryParams>>;
  reletedRegistrations?: {
    selectedRegistrations: any,
    setSeletedRegistrations: any
  }
}

export const RegistrationTableWrapper = ({
  registrations,
  registrationColumns,
  meta,
  setPage,
  reletedRegistrations
}: RegistrationTableWrapperProps) => {

  return (
    <Table
      aria-label="Example table with dynamic content"
      bottomContentPlacement="outside"
      selectionMode={reletedRegistrations ? "multiple" : undefined}
      selectedKeys={reletedRegistrations ? reletedRegistrations?.selectedRegistrations : undefined}
      onSelectionChange={reletedRegistrations ? reletedRegistrations?.selectedRegistrations : undefined}
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
              if (setPage) {
                setPage((prev) => ({
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
      <TableBody items={registrations} emptyContent="Không tìm thấy phiếu mượn">
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
