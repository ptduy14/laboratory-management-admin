"use client";
import { SearchIcon } from "../icons/searchicon";
import Link from "next/link";
import { HouseIcon } from "../icons/breadcrumb/house-icon";
import { Input } from "@nextui-org/react";
import { LoaderTable } from "../loader/loader-table";
import { useEffect, useState } from "react";
import { ResouceService } from "@/services/resourceService";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";
import { ResourceTableWrapper } from "../resoures/resource-table/resource-table";
import { ResourceType } from "../resoures/resource-table/data";
import { resourceFromCategoryColumns } from "./category-table/data";

export const ResourcesFromCategory = ({ id }: { id: string }) => {
  const [resources, setResources] = useState<ResourceType[]>([]);
  const router = useRouter()

  useEffect(() => {
    getResourcesFromCategory();
  }, [])

  const getResourcesFromCategory = async () => {
    try {
        const { data } = await ResouceService.getByCategory(id);
        setResources(data);
    } catch (error) {
        if (axios.isAxiosError(error))
        router.push('/')
        toast.error("Không tìm thấy dữ liệu")
    }
  }

  console.log(resources)

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
          <span>Cái này sẽ thêm sau</span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>List</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">All Cái này sẽ thêm sau</h3>
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
          />
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
      {resources.length > 0 ? 
        (
          <>
          <span className="text-default-400 text-small">Tổng số "cái này sẽ thêm sau": {resources.length} </span>
        <div style={{ marginBottom: '16px' }}></div>
        <ResourceTableWrapper resources={resources} columns={resourceFromCategoryColumns}/></>
        )
         : <LoaderTable />}
      </div>
    </div>
  );
};
