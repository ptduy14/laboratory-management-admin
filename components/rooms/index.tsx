"use client";
import Link from "next/link";
import { HouseIcon } from "../icons/breadcrumb/house-icon";
import useSWR from "swr";
import { CategoryService } from "@/services/categoryService";
import { Button } from "@nextui-org/react";
import { ExportIcon } from "../icons/accounts/export-icon";
import { LoaderTable } from "../loader/loader-table";
import { RoomService } from "@/services/roomService";
import { RoomTableWrapper } from "./room-table/room-table";
import { RoomColumns } from "./room-table/data";
import { AddRoom } from "./add-room";
import { roomsFetcher } from "@/utils/fetchers/room-fetchers.ts/rooms-fetcher";

export const Rooms = () => {
  const { data: rooms, isLoading: isFetchingRooms, mutate: updateRoomList } = useSWR(["/rooms", {take: 50}], ([url, queryParams]) => roomsFetcher(url, queryParams));

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
          <span>Danh mục PTN</span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>List</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Tất cả phòng</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex flex-row gap-3.5 flex-wrap">
          <AddRoom mutate={updateRoomList}/>
          <Button color="primary" startContent={<ExportIcon />}>
            Export to CSV
          </Button>
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        {!isFetchingRooms && rooms ? (
           <RoomTableWrapper rooms={rooms.data} columns={RoomColumns} />
        ) : (
          <LoaderTable />
        )}
      </div>
    </div>
  );
};
