"use client";
import { Button, Input, Selection, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ExportIcon } from "@/components/icons/accounts/export-icon";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { LoaderTable } from "../loader/loader-table";
import { Resource } from "./resource-table/data";
import { ResouceService } from "@/services/resourceService";
import { ResourceTableWrapper } from "./resource-table/resource-table";
import { ChevronDownIcon } from "../icons/chevron-down-icon";
import { statusOptions } from "./resource-table/data";
import { AddResource } from "./add-resource";
import { originOptions } from "./resource-table/data";
import useSWR from "swr";

export const Resources = () => {
  // const [resources, setResources] = useState<Resource[]>([]);
  // const [searchFilterValue, setSearchFilterValue] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = React.useState<Selection>('all');
  const [originFilter, setOriginFilter] = React.useState<Selection>('all');

  const { data: resources } = useSWR(`/items?page=${page}`, async (url) => {
    const { data } = await ResouceService.getAll(url);
    return data;
  })

  // useEffect(() => {
  //   getAllResoueces();
  // }, []);

  // const getAllResoueces = async () => {
  //   const { data } = await ResouceService.getAll();
  //   setResources(data);
  // };

  // const onSearchChange = (value?: string) => {
  //   if (value) {
  //     setSearchFilterValue(value)
  //   } else {
  //     setSearchFilterValue("")
  //   }
  // }

  // const handleFilteredItems = () => {
  //   let filteredResources = [...resources];

  //   if (searchFilterValue) {
  //     filteredResources = filteredResources.filter((resource) => resource.name.toLowerCase().includes(searchFilterValue.toLowerCase()))
  //   }

  //   if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
  //     filteredResources = filteredResources.filter((resource) => {
  //       return Array.from(statusFilter).includes(resource.status.toString())
  //     })
  //   }

  //   if (originFilter !== "all" && Array.from(originFilter).length !== originOptions.length) {
  //     filteredResources = filteredResources.filter((resource) => {
  //       return Array.from(originFilter).includes(resource.origin)
  //     })
  //   }

  //   return filteredResources;
  // }

  // const filteredItems = handleFilteredItems();

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
        {/* <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            isClearable
            placeholder="Search accounts by Email"
            value={searchFilterValue}
            onValueChange={onSearchChange}
          /> */}
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
                  Xuất xứ
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={originFilter}
                selectionMode="multiple"
                onSelectionChange={setOriginFilter}
              >
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
          <AddResource/>
          <Button color="primary" startContent={<ExportIcon />}>
            Export to CSV
          </Button>
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        {resources?.data.length > 0 ? 
        (
          <>
          <span className="text-default-400 text-small">Tổng số sản phẩm - tài nguyên của hệ thống: {resources?.meta.numberRecords} </span>
        <div style={{ marginBottom: '16px' }}></div>
        <ResourceTableWrapper resources={resources.data} meta={resources.meta} setPage={setPage} page={page}/></>
        )
         : <LoaderTable />}
      </div>
    </div>
  );
};
