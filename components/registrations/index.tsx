"use client";
import Link from "next/link";
import { HouseIcon } from "../icons/breadcrumb/house-icon";
import {
  Input,
  Button,
  Selection,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { LoaderTable } from "../loader/loader-table";
import useSWR from "swr";
import { useState } from "react";
import { registrationsFetcher } from "@/utils/fetchers/registration-fetchers/registrations-fetcher";
import { RegistrationTableWrapper } from "./registration-table/registration-table";
import { registraionColumns } from "./registration-table/data";

export const Registrations = () => {
  const [queryParams, setQueryParams] = useState({});

  const { data: registrations, isLoading: isFetchingRegistrations } = useSWR(
    [`/registration`, queryParams],
    ([url, queryParams]) => registrationsFetcher(url, queryParams)
  );

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
          <span>Phiếu mượn</span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>List</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Danh sách các phiếu mượn</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            isClearable
            placeholder="Search registrations by name"
            // value={searchFilterValue}
            // onValueChange={onSearchChange}
          />
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap"></div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        {!isFetchingRegistrations ? (
          <RegistrationTableWrapper
            registrations={registrations.data}
            registrationColumns={registraionColumns}
            meta={registrations.meta}
            setQueryParams={setQueryParams}
          />
        ) : (
          <LoaderTable />
        )}
      </div>
    </div>
  );
};
