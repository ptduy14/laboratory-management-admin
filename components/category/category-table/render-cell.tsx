import React from "react";
import { Category } from "./data";
import { Chip, Tooltip } from "@nextui-org/react";
import { CategoryStatusNames } from "@/enums/category-status";
import { UpdateCategory } from "../update-category";
import { DeleteIcon } from "@/components/icons/table/delete-icon";

interface RenderCellProps {
  category: Category;
  columnKey: string | React.Key;
}

export const RenderCell = ({ category, columnKey }: RenderCellProps) => {
  // @ts-ignore
  const cellValue = category[columnKey];

  switch (columnKey) {
    case "status":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={cellValue === 0 ? "success" : cellValue === 1 ? "danger" : "warning"}>
          <span className="capitalize text-xs">{CategoryStatusNames[cellValue]}</span>
        </Chip>
      );
    case "actions":
      return (
        <div className="flex items-center gap-4 ">
          <UpdateCategory categoryId={category.id}/>
          <div>
            <Tooltip
              content="Xóa danh mục"
              color="danger"
              onClick={() => console.log("Delete user", category.id)}
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
