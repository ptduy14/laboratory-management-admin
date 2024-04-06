"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { DotsIcon } from "@/components/icons/accounts/dots-icon";
import { ExportIcon } from "@/components/icons/accounts/export-icon";
import { InfoIcon } from "@/components/icons/accounts/info-icon";
import { TrashIcon } from "@/components/icons/accounts/trash-icon";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { SettingsIcon } from "@/components/icons/sidebar/settings-icon";
import { SearchIcon } from "../icons/searchicon";
import { TableWrapper } from "./account-table/table";
import { AddUser } from "./add-user";
import { UserService } from "@/services/userService";
import { Account } from "./account-table/columns";
import { LoaderTable } from "../loader/loader-table";

export const Accounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = async () => {
    const { data } = await UserService.getAll();
    setAccounts(data);
  };


  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex">
        <li className="flex gap-2">
          <HouseIcon />
          <Link href={"/"}>
            <span>Home</span>
          </Link>
          <span> / </span>{" "}
        </li>

        <li className="flex gap-2">
          <UsersIcon />
          <span>Users</span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>List</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">All Accounts</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            startContent={<SearchIcon />}
            isClearable
            placeholder="Search users by Email"
          />
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <AddUser />
          <Button color="primary" startContent={<ExportIcon />}>
            Export to CSV
          </Button>
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        {accounts.length > 0 ? 
          <>
            <span className="text-default-400 text-small">Total {accounts.length} accounts</span>
            <div style={{ marginBottom: '16px' }}></div>
            <TableWrapper accounts={accounts} />
          </>
         : (
          <LoaderTable />
        )}
      </div>
    </div>
  );
};
