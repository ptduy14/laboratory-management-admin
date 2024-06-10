import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "@/components/icons/table/delete-icon";
import { EyeIcon } from "@/components/icons/table/eye-icon";
import { EditIcon } from "@/components/icons/table/edit-icon";
import { Resource } from "./data";
import { ResourceStatusName } from "@/enums/resource-status";
import { UnitEnumNames } from "@/enums/unit";
import UpdateResouce from "../update-resource";
import { DetailResource } from "../detail-resource";

interface Props {
  resouce: Resource;
  columnKey: string | React.Key;
}

export const RenderCell = ({ resouce, columnKey }: Props) => {
  // @ts-ignore
  const cellValue = resouce[columnKey];
  switch (columnKey) {
    case "specification":
      return cellValue !== "" ? (
        cellValue
      ) : (
          <span className="capitalize text-sm">-</span>
      );
    case "origin":
      return cellValue !== "" ? (
        cellValue
      ) : (
        <span className="capitalize text-sm">-</span>
      );
    case "category":
      return cellValue.name;

    case "unit":
      return UnitEnumNames[cellValue];
    case "status":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            cellValue === 0 || cellValue === 1
              ? "success"
              : cellValue === 2
              ? "warning"
              : "danger"
          }
        >
          <span className="capitalize text-xs">
            {ResourceStatusName[cellValue]}
          </span>
        </Chip>
      );
    case "actions":
      return (
        <div className="flex items-center gap-4 ">
          <div>
            <DetailResource resourceId={resouce.id}/>
          </div>
          <div>
            <UpdateResouce resourceId={resouce.id}/>
          </div>
          <div>
            <Tooltip
              content="Xóa"
              color="danger"
              onClick={() => console.log("Delete user", resouce.id)}
            >
              <button>
                <DeleteIcon size={20} fill="#FF0080" />
              </button>
            </Tooltip>
          </div>
        </div>
      );
    default:
      return cellValue;
  }
};
