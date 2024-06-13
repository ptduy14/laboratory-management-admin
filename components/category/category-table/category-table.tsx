import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, getKeyValue} from "@nextui-org/react";
import { EditIcon } from "@/components/icons/table/edit-icon";
import { EyeIcon } from "@/components/icons/table/eye-icon";
import { DeleteIcon } from "@/components/icons/table/delete-icon";
import { Category } from "./data";
import { RenderCell } from "./render-cell";

interface CategoryTableWrapperProps {
    columns: {key: string, label: string}[],
    categories: Category[]
}


export const CategoryTableWrapper = ({ columns, categories }: CategoryTableWrapperProps) => {
    return (
        <Table aria-label="Caterories table">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
            </TableHeader>
            <TableBody items={categories}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{RenderCell({category: item, columnKey: columnKey})}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}