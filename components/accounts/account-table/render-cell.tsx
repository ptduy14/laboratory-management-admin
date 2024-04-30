import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "@/components/icons/table/delete-icon";
import { Account } from "./data";
import { DetailAccount } from "../detail-account";
import { RoleNames } from "@/enums/role";
import UpdateAccount from "../update-account";
import { StatusNames } from "@/enums/status";

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
            src: account.photo !== null ? account.photo : "",
          }}
        />
      );
    case "role":
      return (
        <div>
          <span>{RoleNames[account.role]}</span>
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
            {StatusNames[cellValue]}
          </span>
        </Chip>
      );

    case "actions":
      return (
        <div className="flex items-center gap-4 ">
          <DetailAccount accountId={account.id} />
          <UpdateAccount accountId={account.id} />
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
