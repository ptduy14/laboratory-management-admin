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
import { useState } from "react";
import { ChevronDownIcon } from "../icons/chevron-down-icon";
import useSWR from "swr";
import { RoomService } from "@/services/roomService";
import { originOptions } from "../resoures/resource-table/data";
import { statusOptions } from "../resoures/resource-table/data";
import { RoomResourcesTableWrapper } from "./room-resources-table/room-resources-table";
import { ResourcesTransferedColumns } from "./room-resources-table/data";

export const RoomResources = ({ roomId }: {roomId: string}) => {
    const [page, setPage] = useState(1);

    const { data: room, isLoading: isFetchingRoom } = useSWR(`/rooms/${roomId}`, async (url) => {
        const { data } = await RoomService.getById(url);
        return data
    })

    const { data: resourceTransfered,isLoading: isFetchingResourceTransfered } = useSWR(`/room-items/room/${roomId}?page=${page}`, async (url) => {
        const { data } = await RoomService.getResourcesFromRoom(url);
        return data
    })

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
              <span>{room?.name}</span>
              <span> / </span>{" "}
            </li>
            <li className="flex gap-2">
              <span>List</span>
            </li>
          </ul>
    
          <h3 className="text-xl font-semibold">Danh sách tài nguyên đã được bàn giao cho phòng {room?.name.toLowerCase()}</h3>
          <div className="flex justify-between flex-wrap gap-4 items-center">
            <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
            <Input
                classNames={{
                  input: "w-full",
                  mainWrapper: "w-full",
                }}
                isClearable
                placeholder="Search accounts by name"
                // value={searchFilterValue}
                // onValueChange={onSearchChange}
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
                    // selectedKeys={statusFilter}
                    // selectionMode="multiple"
                    // onSelectionChange={setStatusFilter}
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
                    // selectedKeys={originFilter}
                    // selectionMode="multiple"
                    // onSelectionChange={setOriginFilter}
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
          </div>
          <div className="max-w-[95rem] mx-auto w-full">
          {!isFetchingResourceTransfered ? 
            (
              <>
              <span className="text-default-400 text-small">Tài nguyên đã bàn giao: {resourceTransfered.meta.numberRecords} </span>
            <div style={{ marginBottom: '16px' }}></div>
            <RoomResourcesTableWrapper columns={ResourcesTransferedColumns} resourcesTransfered={resourceTransfered.data} setPage={setPage} meta={resourceTransfered.meta}/></>
            )
             : <LoaderTable />}
          </div>
        </div>
      );
}