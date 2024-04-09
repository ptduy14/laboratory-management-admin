import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "@/components/icons/table/delete-icon";
import { EditIcon } from "@/components/icons/table/edit-icon";
import { Account } from "./data";
import { DetailAccount } from "../detail-account";

interface Props {
  account: Account;
  columnKey: string | React.Key;
}

export const RenderCell = ({ account, columnKey }: Props) => {
  // @ts-ignore
  const cellValue = account[columnKey];
  switch (columnKey) {
    case "firstName":
      return (
        <User
          name={account.lastName + cellValue}
          description={account.email}
          avatarProps={{
            src: account.photo !== null ? account.photo : "https://i.pravatar.cc/150?u=a04258114e29026302d",
          }}
        />
      );
    case "role":
      return (
        <div>
          <div>
            <span>{cellValue}</span>
          </div>
          <div>
            <span>{account.roles[0].value}</span>
          </div>
        </div>
      );
    case "status":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            cellValue === 0 ? "success" : cellValue === 1 ? "danger" : "warning"
          }
        >
          <span className="capitalize text-xs">
            {cellValue === 0 ? "Acitve" : "Not Active"}
          </span>
        </Chip>
      );

    case "actions":
      return (
        <div className="flex items-center gap-4 ">
          <DetailAccount accountId = {account.id} />
          <div>
            <Tooltip content="Edit user" color="secondary">
              <button onClick={() => console.log("Edit user", account.id)}>
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip
              content="Delete user"
              color="danger"
              onClick={() => console.log("Delete user", account.id)}
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
