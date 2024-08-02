"use client";
import {
  Button,
  Input,
  Selection,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { ChevronDownIcon } from "../icons/chevron-down-icon";
import { SearchIcon } from "../icons/searchicon";
import { AccountTableWrapper } from "./account-table/account-table";
import { AddAccount } from "./add-account";
import { LoaderTable } from "../loader/loader-table";
import { statusOptions } from "./account-table/data";
import { roleOptions } from "./account-table/data";
import useSWR from "swr";
import { ExportCSVAccount } from "./export-csv-account";
import { accountsFetcher } from "@/utils/fetchers/account-fetchers.ts/accountsFetcher";
import { QueryParams } from "@/types/query-params";
import { useDebounce } from "../hooks/useDebounce";

export const Accounts = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const debounceSearchValue = useDebounce(searchValue);
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [roleFilter, setRoleFilter] = React.useState<Selection>("all");
  const [queryParams, setQueryParams] = useState<QueryParams>({});

  const {
    data: accounts,
    mutate: updateAccountList,
    isLoading: isFetchingAccounts,
  } = useSWR(["/users/get", queryParams], ([url, queryParams]) =>
    accountsFetcher(url, queryParams)
  );

  useEffect(() => {
    if (statusFilter !== "all") {
      const arrayStatusFilterString = Array.from(statusFilter);
      const arrayStatusFilterNumber = arrayStatusFilterString.map((item) => Number(item))
      
      setQueryParams((prev) => ({
        ...prev,
        status: arrayStatusFilterNumber
      })) 
    }

    if (roleFilter !== "all") { 
      const arrayRoleFilterString = Array.from(roleFilter);
      const arrayRoleFilterNumber = arrayRoleFilterString.map((item) => Number(item))
      
      setQueryParams((prev) => ({
        ...prev,
        role: arrayRoleFilterNumber
      }))
    }
  }, [statusFilter, roleFilter])


  // this will occur errors cause when component is re-render then statement only true and set method will update
  // => it make trigger re-render infinity loop
  // if (statusFilter !== "all") {
  //   const arrayStatusFilterString = Array.from(statusFilter);
  //   const arrayStatusFilterNumber = arrayStatusFilterString.map((item) => Number(item))
    
  //   setQueryParams((prev) => ({
  //     ...prev,
  //     status: arrayStatusFilterNumber
  //   })) 
  // }

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      keyword: debounceSearchValue
    }))
  }, [debounceSearchValue]);

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
            placeholder="Tìm kiếm bằng email"
            value={searchValue}
            onValueChange={(value) => {setSearchValue(value)}}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Trạng thái
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}>
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
                  Vai trò
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={roleFilter}
                selectionMode="multiple"
                onSelectionChange={setRoleFilter}>
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
          <AddAccount mutate={updateAccountList} />
          <ExportCSVAccount />
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        {!isFetchingAccounts ? (
          <>
            <span className="text-default-400 text-small">
              Total {accounts.data.length} accounts
            </span>
            <div style={{ marginBottom: "16px" }}></div>
            <AccountTableWrapper
              accounts={accounts.data}
              meta={accounts.meta}
              paginate={true}
              setPage={setQueryParams}
            />
          </>
        ) : (
          <LoaderTable />
        )}
      </div>
    </div>
  );
};
