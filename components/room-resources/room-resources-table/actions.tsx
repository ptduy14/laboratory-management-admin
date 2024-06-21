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
  import { VerticalDotsIcon } from "@/components/icons/vertical-dots-icons";
  import { DeleteIcon } from "@/components/icons/table/delete-icon";
  import { EyeIcon } from "@/components/icons/table/eye-icon";
  import { EditIcon } from "@/components/icons/table/edit-icon";
  import { ViewIcon } from "@/components/icons/sidebar/view-icon";
import { ResourcesTransfered } from "./data";
  import { useDisclosure } from "@nextui-org/react";
  import { ReTransferResource } from "../retransfer-resource";
  import { DetailRoomResource } from "../detail-room-resource";
  import { DeleteRoomResource } from "../delete-room-resource";
  
  export const Actions = ({ resourceTranfered }: { resourceTranfered: ResourcesTransfered }) => {
    const reTransferModalDisclosure = useDisclosure();
    const detailRoomResourceModalDisclosure = useDisclosure();
    const deleteRoomResourceModalDisclosure = useDisclosure();
    
    return (
      <div className="relative flex justify-end items-center gap-2">
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size="sm" variant="light">
              <VerticalDotsIcon className="text-default-300" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Example with disabled actions"
            onAction={(key) => {
              if (key === "retransfer") {
                reTransferModalDisclosure.onOpen();
              }
  
              if (key === "detail") {
                detailRoomResourceModalDisclosure.onOpen();
              }
  
              if (key === "delete") {
                deleteRoomResourceModalDisclosure.onOpen();
            }
            }}>
            <DropdownItem key="retransfer" startContent={<EditIcon size={20} fill="#979797" />}>
             Chuyển tiếp tài nguyên
            </DropdownItem>
            <DropdownItem key="detail" startContent={<EyeIcon size={20} fill="#979797" />}>
              Chi tiết tài nguyên
            </DropdownItem>
            <DropdownItem key="delete" className="text-danger" startContent={<DeleteIcon size={20} fill="#FF0080" />}>
             Thu hồi tài nguyên
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <ReTransferResource resourceTransfered={resourceTranfered} disclosure={reTransferModalDisclosure} />
        <DetailRoomResource resourceTransferedId={resourceTranfered.id} disclosure={detailRoomResourceModalDisclosure}/>
        <DeleteRoomResource resourceTransfered={resourceTranfered} disclosure={deleteRoomResourceModalDisclosure}/>
        {/* <DetailResource resourceId={resource.id} disclosure={detailModalDisclosure} />
        <UpdateResouce resourceId={resource.id} disclosure={updateModalDisclosure}/>
        <DeleteResource resourceId={resource.id} disclosure={deleteModalDisclosure}/> */}
      </div>
    );
  };
  