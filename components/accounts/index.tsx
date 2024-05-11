"use client";
import { Button, Input, Selection, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import Link from "next/link";
import React, {useEffect, useState } from "react";
import { ExportIcon } from "@/components/icons/accounts/export-icon";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { ChevronDownIcon } from "../icons/chevron-down-icon";
import { SearchIcon } from "../icons/searchicon";
import { AccountTableWrapper } from "./account-table/account-table";
import { AddAccount } from "./add-account";
import { UserService } from "@/services/userService";
import { Account } from "./account-table/data";
import { LoaderTable } from "../loader/loader-table";
import { statusOptions } from "./account-table/data";
import { roleOptions } from "./account-table/data";

export const Accounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [searchFilterValue, setSearchFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = React.useState<Selection>('all');
  const [roleFilter, setRoleFilter] = React.useState<Selection>('all');

  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = async () => {
    const { data } = await UserService.getAll();
    setAccounts(data);
  };

  const onSearchChange = (value?: string) => {
    if (value) {
      setSearchFilterValue(value)
    } else {
      setSearchFilterValue("")
    }
  }

  const handleFilteredItems = () => {
    let filteredAccounts = [...accounts];

    if (searchFilterValue) {
      filteredAccounts = filteredAccounts.filter((account) => {
        const accountEmail = account.email.toLowerCase();
        return accountEmail.substring(0, accountEmail.indexOf('@')).includes(searchFilterValue.toLowerCase())
      })
    }

    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredAccounts = filteredAccounts.filter((account) => {
        return Array.from(statusFilter).includes(account.status.toString())
      })
    }

    if (roleFilter !== "all" && Array.from(roleFilter).length !== roleOptions.length) {
      filteredAccounts = filteredAccounts.filter((account) => {
        return Array.from(roleFilter).includes(account.role.toString())
      })
    }

    return filteredAccounts;
  }

  const filteredItems = handleFilteredItems();

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
          <span>Accounts</span>
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
            placeholder="Search accounts by Email"
            value={searchFilterValue}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Role
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={roleFilter}
                selectionMode="multiple"
                onSelectionChange={setRoleFilter}
              >
                {roleOptions.map((role) => (
                  <DropdownItem key={role.uid} className="capitalize">
                    {role.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <AddAccount setAccounts={setAccounts} accounts={accounts}/>
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
            <AccountTableWrapper accounts={filteredItems} setAccounts={setAccounts} paginate={true}/>
          </>
          : (
            <LoaderTable />
          )}
      </div>
    </div>
  );
};
