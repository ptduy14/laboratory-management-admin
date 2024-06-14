import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, getKeyValue} from "@nextui-org/react";
import { EditIcon } from "@/components/icons/table/edit-icon";
import { EyeIcon } from "@/components/icons/table/eye-icon";
import { DeleteIcon } from "@/components/icons/table/delete-icon";
import { Room } from "./data";
import { RenderCell } from "./render-cell";

interface RoomTableWrapperProps {
    columns: {key: string, label: string}[],
    rooms: Room[]
}


export const RoomTableWrapper = ({ columns, rooms }: RoomTableWrapperProps) => {
    return (
        <Table aria-label="Caterories table">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
            </TableHeader>
            <TableBody items={rooms}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{RenderCell({room: item, columnKey: columnKey})}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}