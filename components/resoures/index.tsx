"use client";
import {
  Button,
  Input,
  Selection,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { ExportIcon } from "@/components/icons/accounts/export-icon";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { LoaderTable } from "../loader/loader-table";
import { Resource } from "./resource-table/data";
import { ResourceService } from "@/services/resourceService";
import { ResourceTableWrapper } from "./resource-table/resource-table";
import { ChevronDownIcon } from "../icons/chevron-down-icon";
import { statusOptions } from "./resource-table/data";
import { AddResource } from "./add-resource";
import { originOptions } from "./resource-table/data";
import useSWR from "swr";
import { ExportCSVResource } from "./export-csv-resource";
import { QueryParams } from "@/types/query-params";
import { resourcesFetcher } from "@/utils/fetchers/resource-fetchers.ts/resources-fetcher";
import { useDebounce } from "../hooks/useDebounce";

export const Resources = () => {
  const [searchValue, setSearchValue] = useState("");
  const debounceSearchValue = useDebounce(searchValue);
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [originFilter, setOriginFilter] = useState<Selection>("all");
  const [queryParams, setQueryParams] = useState<QueryParams>({});
  const {
    data: resources,
    isLoading: isFetchingResouces,
    mutate: updateResourceList,
  } = useSWR(["/items", queryParams], ([url, queryParams]) => resourcesFetcher(url, queryParams));


  useEffect(() => {
    if (statusFilter !== "all") {
      const arrayStatusFilterKey = Array.from(statusFilter);
      const arrayStatusFilterNumber = arrayStatusFilterKey.map((item) => Number(item))
      console.log(arrayStatusFilterNumber)
      setQueryParams((prev) => ({
        ...prev,
        status: arrayStatusFilterNumber
      })) 
    }

    if (originFilter !== "all") {
      const arrayOriginFilterKey = Array.from(originFilter);
      const arrayOriginFilterString = arrayOriginFilterKey.map(() => String(arrayOriginFilterKey))
      setQueryParams((prev) => ({
        ...prev,
        producer: arrayOriginFilterString
      })) 
    }

  }, [statusFilter, originFilter])

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      keyword: debounceSearchValue
    }))
  }, [debounceSearchValue])

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
          <span>Tài nguyên</span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>List</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Tài nguyên</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            isClearable
            placeholder="Tìm kiếm tài nguyên"
            value={searchValue}
            onValueChange={(value) => setSearchValue(value)}
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
                  Xuất xứ
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={originFilter}
                selectionMode="multiple"
                onSelectionChange={setOriginFilter}>
                {originOptions.map((origin) => (
                  <DropdownItem key={origin.uid} className="capitalize">
                    {origin.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <AddResource mutate={updateResourceList} />
          <ExportCSVResource />
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        {!isFetchingResouces ? (
          <>
            <span className="text-default-400 text-small">
              Tổng số sản phẩm - tài nguyên của hệ thống: {resources.data.length}{" "}
            </span>
            <div style={{ marginBottom: "16px" }}></div>
            <ResourceTableWrapper
              resources={resources.data}
              meta={resources.meta}
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
