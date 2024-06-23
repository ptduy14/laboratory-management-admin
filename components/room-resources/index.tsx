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
import { useState, useEffect } from "react";
import { ChevronDownIcon } from "../icons/chevron-down-icon";
import useSWR from "swr";
import { RoomService } from "@/services/roomService";
import { originOptions } from "../resoures/resource-table/data";
import { statusOptions } from "../resoures/resource-table/data";
import { RoomResourcesTableWrapper } from "./room-resources-table/room-resources-table";
import { ResourcesTransferedColumns } from "./room-resources-table/data";
import { ExportCSVRoomResource } from "./export-csv-room-resource";
import { roomFetcher } from "@/utils/fetchers/room-fetchers.ts/room-fetcher";
import { QueryParams } from "@/types/query-params";
import { roomResourcesFetcher } from "@/utils/fetchers/room-resource-fetchers/room-resources-fetcher";
import { useDebounce } from "../hooks/useDebounce";

export const RoomResources = ({ roomId }: { roomId: string }) => {
  const [queryParams, setQueryParams] = useState<QueryParams>({});
  const [searchValue, setSearchValue] = useState("");
  const debounceSearchValue = useDebounce(searchValue);
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [originFilter, setOriginFilter] = useState<Selection>("all");

  const { data: room, isLoading: isFetchingRoom } = useSWR(`/rooms/${roomId}`, roomFetcher);

  const { data: resourceTransfered, isLoading: isFetchingResourceTransfered } = useSWR(
    [`/room-items/room/${roomId}`, queryParams],
    ([url, queryParams]) => roomResourcesFetcher(url, queryParams)
  );

  useEffect(() => {
    if (statusFilter !== "all") {
      const arrayStatusFilterKey = Array.from(statusFilter);
      const arrayStatusFilterNumber = arrayStatusFilterKey.map((item) => Number(item));
      console.log(arrayStatusFilterNumber);
      setQueryParams((prev) => ({
        ...prev,
        status: arrayStatusFilterNumber,
      }));
    }

    if (originFilter !== "all") {
      const arrayOriginFilterKey = Array.from(originFilter);
      const arrayOriginFilterString = arrayOriginFilterKey.map(() => String(arrayOriginFilterKey));
      setQueryParams((prev) => ({
        ...prev,
        producer: arrayOriginFilterString,
      }));
    }
  }, [statusFilter, originFilter]);

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      keyword: debounceSearchValue,
    }));
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
          <span>{room?.name}</span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>List</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">
        Danh sách tài nguyên đã được bàn giao cho phòng {room?.name.toLowerCase()}
      </h3>
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
          <ExportCSVRoomResource roomId={roomId} />
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        {!isFetchingResourceTransfered ? (
          <>
            <span className="text-default-400 text-small">
              Tài nguyên đã bàn giao: {resourceTransfered.meta.numberRecords}{" "}
            </span>
            <div style={{ marginBottom: "16px" }}></div>
            <RoomResourcesTableWrapper
              columns={ResourcesTransferedColumns}
              resourcesTransfered={resourceTransfered.data}
              setPage={setQueryParams}
              meta={resourceTransfered.meta}
            />
          </>
        ) : (
          <LoaderTable />
        )}
      </div>
    </div>
  );
};
