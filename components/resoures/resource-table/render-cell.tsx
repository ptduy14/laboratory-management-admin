import {
  User,
  Tooltip,
  Chip,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "@/components/icons/table/delete-icon";
import { EyeIcon } from "@/components/icons/table/eye-icon";
import { EditIcon } from "@/components/icons/table/edit-icon";
import { Resource } from "./data";
import { ResourceStatusName } from "@/enums/resource-status";
import { UnitEnumNames } from "@/enums/unit";
import UpdateResouce from "../update-resource";
import { DetailResource } from "../detail-resource";
import { HandoverStatusName } from "@/enums/handover-status";
import { TransferResource } from "../transfer-resource";
import { VerticalDotsIcon } from "@/components/icons/vertical-dots-icons";
import { ViewIcon } from "@/components/icons/sidebar/view-icon";
import { useDisclosure } from "@nextui-org/react";
import type { UseDisclosureReturn } from "@nextui-org/use-disclosure";
import { Actions } from "./actions";

interface Props {
  resouce: Resource;
  columnKey: string | React.Key;
}

export const RenderCell = ({ resouce, columnKey }: Props) => {
  // @ts-ignore
  const cellValue = resouce[columnKey];
  switch (columnKey) {
    case "specification":
      return cellValue !== "" ? cellValue : <span className="capitalize text-sm">-</span>;
    case "origin":
      return cellValue !== "" ? cellValue : <span className="capitalize text-sm">-</span>;
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
            cellValue === 0 || cellValue === 1 ? "success" : cellValue === 2 ? "warning" : "danger"
          }>
          <span className="capitalize text-xs">{ResourceStatusName[cellValue]}</span>
        </Chip>
      );
    case "available":
      return resouce.quantity - resouce.handover;
    case "actions":
      return (
        <Actions resource={resouce} />
        // <div className="relative flex justify-end items-center gap-2">
        //   <Dropdown>
        //     <DropdownTrigger>
        //       <Button isIconOnly size="sm" variant="light">
        //         <VerticalDotsIcon className="text-default-300" />
        //       </Button>
        //     </DropdownTrigger>
        //     <DropdownMenu aria-label="Example with disabled actions">
        //       <DropdownItem key="transfer" startContent={<ViewIcon />}>
        //         xxxx
        //       </DropdownItem>
        //       <DropdownItem key="detail" startContent={<EyeIcon size={20} fill="#979797" />}>
        //         <DetailResource resourceId={resouce.id} />
        //       </DropdownItem>
        //       <DropdownItem key="edit" startContent={<EditIcon size={20} fill="#979797" />}>
        //         <UpdateResouce resourceId={resouce.id} />
        //       </DropdownItem>
        //       <DropdownItem key="delete" startContent={<DeleteIcon size={20} fill="#FF0080" />}>
        //         Xóa
        //       </DropdownItem>
        //     </DropdownMenu>
        //   </Dropdown>
        // </div>
        // <DetailResource resourceId={resouce.id} />
        // <UpdateResouce resourceId={resouce.id} />

        // <div className="flex items-center gap-4 ">
        //   {resouce.handoverStatus == 1 && (
        //     <div>
        //       <TransferResource resource={resouce}/>
        //     </div>
        //   )}
        //   <div>
        //     <DetailResource resourceId={resouce.id} />
        //   </div>
        //   <div>
        //     <UpdateResouce resourceId={resouce.id} />
        //   </div>
        //   <div>
        //     <Tooltip
        //       content="Xóa"
        //       color="danger"
        //       onClick={() => console.log("Delete user", resouce.id)}>
        //       <button>
        //         <DeleteIcon size={20} fill="#FF0080" />
        //       </button>
        //     </Tooltip>
        //   </div>
        // </div>
      );
    default:
      return cellValue;
  }
};
