// import {
//     User,
//     Tooltip,
//     Chip,
//     DropdownTrigger,
//     Dropdown,
//     DropdownMenu,
//     DropdownItem,
//     Button,
//   } from "@nextui-org/react";
//   import React from "react";
//   import { VerticalDotsIcon } from "@/components/icons/vertical-dots-icons";
//   import { DeleteIcon } from "@/components/icons/table/delete-icon";
//   import { EyeIcon } from "@/components/icons/table/eye-icon";
//   import { EditIcon } from "@/components/icons/table/edit-icon";
//   import { ViewIcon } from "@/components/icons/sidebar/view-icon";
//   import { useDisclosure } from "@nextui-org/react";
// import { DetailRegistration } from "../detail-registration";
// import { Registration } from "./data";
  
//   export const Actions = ({ registration }: { registration: Registration }) => {
//     const detailModalDisclosure = useDisclosure();
//     const updateModalDisclosure = useDisclosure();
//     const deleteModalDisclosure = useDisclosure();
    
//     return (
//       <div className="relative flex justify-end items-center gap-2">
//         <Dropdown>
//           <DropdownTrigger>
//             <Button isIconOnly size="sm" variant="light">
//               <VerticalDotsIcon className="text-default-300" />
//             </Button>
//           </DropdownTrigger>
//           <DropdownMenu
//             aria-label="Example with disabled actions"
//             onAction={(key) => {
//               if (key === "detail") {
//                 detailModalDisclosure.onOpen();
//               }
  
//               if (key === "update") {
//                   updateModalDisclosure.onOpen();
//               }
  
//               if (key === "delete") {
//                 deleteModalDisclosure.onOpen();
//             }
//             }}>
//             <DropdownItem key="detail" startContent={<EyeIcon size={20} fill="#979797" />}>
//               Chi tiết phiếu mượn
//             </DropdownItem>
//             {/* <DropdownItem key="update" startContent={<EditIcon size={20} fill="#979797" />}>
//              Cập nhật nhật phiếu mượn
//             </DropdownItem> */}
//             {/* <DropdownItem key="delete" className="text-danger" startContent={<DeleteIcon size={20} fill="#FF0080" />}>
//               Xóa tài nguyên
//             </DropdownItem> */}
//           </DropdownMenu>
//         </Dropdown>
//         <DetailRegistration registrationId={registration.id} disclosure={detailModalDisclosure}/>
//       </div>
//     );
//   };
  
export {}