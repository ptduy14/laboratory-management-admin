import React from "react";
import { Room } from "./data";
import { Chip, Tooltip } from "@nextui-org/react";
import { RoomStatusNames } from "@/enums/room-status";
import { DeleteIcon } from "@/components/icons/table/delete-icon";

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
          {/* <UpdateCategory categoryId={category.id}/> */}
          <div>
            <Tooltip
              content="Xóa danh mục"
              color="danger"
              onClick={() => console.log("Delete user", room.id)}
            >
              <button>
                <DeleteIcon size={20} fill="#FF0080" />
              </button>
            </Tooltip>
          </div>
        </div>
      );
    default:
      break;
  }
  return cellValue;
};
