import React from "react";
import { Room } from "./data";
import { Chip, Tooltip } from "@nextui-org/react";
import { RoomStatusNames } from "@/enums/room-status";
import { DeleteIcon } from "@/components/icons/table/delete-icon";
import { UpdateRoom } from "../update-room";
import { DeleteRoom } from "../delete-room";

interface RenderCellProps {
  room: Room;
  columnKey: string | React.Key;
}

export const RenderCell = ({ room, columnKey }: RenderCellProps) => {
  // @ts-ignore
  const cellValue = room[columnKey];

  switch (columnKey) {
    case "status":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={cellValue === 0 ? "success" : cellValue === 1 ? "danger" : "warning"}>
          <span className="capitalize text-xs">{RoomStatusNames[cellValue]}</span>
        </Chip>
      );
    case "remark":
        return cellValue ? cellValue : <span>-</span>
    case "actions":
      return (
        <div className="flex items-center gap-4 ">
         <UpdateRoom room={room}/>
         <DeleteRoom roomId={room.id}/>
        </div>
      );
    default:
      break;
  }
  return cellValue;
};
