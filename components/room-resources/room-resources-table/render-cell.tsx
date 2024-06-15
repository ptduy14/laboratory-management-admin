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
  import { ResourceStatusName } from "@/enums/resource-status";
  import { UnitEnumNames } from "@/enums/unit";
  import { HandoverStatusName } from "@/enums/handover-status";
  import { VerticalDotsIcon } from "@/components/icons/vertical-dots-icons";
  import { ViewIcon } from "@/components/icons/sidebar/view-icon";
  import { useDisclosure } from "@nextui-org/react";
  import type { UseDisclosureReturn } from '@nextui-org/use-disclosure';
  import { ResourcesTransfered } from "./data";
  import { Actions } from "./actions";
  
  interface Props {
    resouceTransfered: ResourcesTransfered;
    columnKey: string | React.Key;
  }
  
  export const RenderCell = ({ resouceTransfered, columnKey }: Props) => {
    // @ts-ignore
    const cellValue = resouceTransfered[columnKey];
    switch (columnKey) {
        case "name": 
        return resouceTransfered.item.name;
      case "specification":
        return resouceTransfered.item.specification !== "" ? resouceTransfered.item.specification : <span className="capitalize text-sm">-</span>;
  
      case "unit":
        return UnitEnumNames[resouceTransfered.item.unit];

      case "actions":
        return <Actions resourceTranfered={resouceTransfered} />
        // case "status":
        // return (
        //   <Chip
        //     size="sm"
        //     variant="flat"
        //     color={
        //       cellValue === 0 || cellValue === 1 ? "success" : cellValue === 2 ? "warning" : "danger"
        //     }>
        //     <span className="capitalize text-xs">{ResourceStatusName[cellValue]}</span>
        //   </Chip>
        // );
      default:
        return cellValue;
    }
  };
  