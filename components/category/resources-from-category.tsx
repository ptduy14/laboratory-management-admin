"use client";
import Link from "next/link";
import { HouseIcon } from "../icons/breadcrumb/house-icon";
import { Input, Button, Selection, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { LoaderTable } from "../loader/loader-table";
import { useEffect, useState } from "react";
import { ResouceService } from "@/services/resourceService";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";
import { ResourceTableWrapper } from "../resoures/resource-table/resource-table";
import { Resource } from "../resoures/resource-table/data";
import { resourcesFromCategoryColumns } from "./category-table/data";
import { ChevronDownIcon } from "../icons/chevron-down-icon";
import { statusOptions } from "../resoures/resource-table/data";
import { originOptions } from "../resoures/resource-table/data";
import useSWR from "swr";
import { CategoryService } from "@/services/categoryService";

export const ResourcesFromCategory = ({ id }: { id: string }) => {
  const [page, setPage] = useState(1)
  const [searchFilterValue, setSearchFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<Selection>('all');
  const [originFilter, setOriginFilter] = useState<Selection>('all');
  const router = useRouter()

  const { data: resourcesFromCategory, isLoading: isFetchingResourcesFromCategory } = useSWR(`/items/category/${id}?page=${page}`, async (url) => {
    const { data } = await ResouceService.getByCategory(url)
    return data
  })

  const {data: category} = useSWR(`/categories/${id}`, async (url) => {
    const { data } = await CategoryService.getById(url)
    return data;
  })

  // useEffect(() => {
  //   getResourcesFromCategory();
  // }, [])

  const onSearchChange = (value?: string) => {
    if (value) {
      setSearchFilterValue(value)
    } else {
      setSearchFilterValue("")
    }
  }

  const handleFilteredItems = () => {
    let filteredResources = isFetchingResourcesFromCategory ? [] : [...resourcesFromCategory.data];

    if (searchFilterValue) {
      filteredResources = filteredResources.filter((resource) => resource.name.toLowerCase().includes(searchFilterValue.toLowerCase()))
    }

    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredResources = filteredResources.filter((resource) => {
        return Array.from(statusFilter).includes(resource.status.toString())
      })
    }

    return filteredResources;
  }

  const filteredItems = handleFilteredItems();

  // const getResourcesFromCategory = async () => {
  //   try {
  //       const { data } = await ResouceService.getByCategory(id);
  //       setResources(data);
  //   } catch (error) {
  //       if (axios.isAxiosError(error))
  //       router.push('/')
  //       toast.error("Không tìm thấy dữ liệu")
  //   }
  // }

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
          <span>{category?.name.toLowerCase()}</span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>List</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Danh sách {category?.name.toLowerCase()}</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
        <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            isClearable
            placeholder="Search accounts by name"
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
          <Button color="primary">
            Thêm {category?.name.toLowerCase()}
          </Button>
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
      {!isFetchingResourcesFromCategory ? 
        (
          <>
          <span className="text-default-400 text-small">Tổng số {category?.name.toLowerCase()}: {resourcesFromCategory.data.length} </span>
        <div style={{ marginBottom: '16px' }}></div>
        <ResourceTableWrapper resources={filteredItems} columns={resourcesFromCategoryColumns} meta={resourcesFromCategory.meta} setPage={setPage}/></>
        )
         : <LoaderTable />}
      </div>
    </div>
  );
};
