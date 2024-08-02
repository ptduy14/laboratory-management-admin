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
import { useEffect, useState } from "react";
import { ResourceService } from "@/services/resourceService";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ResourceTableWrapper } from "../resoures/resource-table/resource-table";
import { Resource } from "../resoures/resource-table/data";
import { categoryResourcesColumns } from "../category/category-table/data";
import { ChevronDownIcon } from "../icons/chevron-down-icon";
import { statusOptions } from "../resoures/resource-table/data";
import { originOptions } from "../resoures/resource-table/data";
import useSWR, { mutate } from "swr";
import { AddCategoryResource } from "./add-category-resource";
import { ExportCSVCategoryResource } from "./export-csv-category-resource";
import { categoryFetcher } from "@/utils/fetchers/category-fetchers.ts/category-fetcher";
import { QueryParams } from "@/types/query-params";
import { categoryResourcesFetcher } from "@/utils/fetchers/category-resource-fetchers/category-resources-fetcher";
import { useDebounce } from "../hooks/useDebounce";
import { useAppContext } from "@/contexts/AppContext";

export const CategoryResources = ({ id }: { id: string }) => {
  const [queryParams, setQueryParams] = useState<QueryParams>({});
  const [searchValue, setSearchValue] = useState("");
  const debounceSearchValue = useDebounce(searchValue);
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [originFilter, setOriginFilter] = useState<Selection>("all");
  const { setAppState } = useAppContext();

  useEffect(() => {
    setAppState((prev) => ({...prev, currentCategoryId: Number(id)}))
  }, [id])

  const {
    data: categoryResources,
    isLoading: isFetchingCategoryResources,
    mutate: updateCategoryResourcesList,
  } = useSWR([`/items/category/${id}`, queryParams], ([url, queryParams]) => categoryResourcesFetcher(url, queryParams));

  const { data: category, isLoading: isFetchingCategory } = useSWR(`/categories/${id}`, categoryFetcher);

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
        {isFetchingCategory || (
          <div className="flex flex-row gap-3.5 flex-wrap">
            <AddCategoryResource mutate={updateCategoryResourcesList} category={category} />
            <ExportCSVCategoryResource categoryId={category.id} />
          </div>
        )}
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        {!isFetchingCategoryResources ? (
          <>
            <span className="text-default-400 text-small">
              Tổng số {category?.name.toLowerCase()}: {categoryResources.data.length}{" "}
            </span>
            <div style={{ marginBottom: "16px" }}></div>
            <ResourceTableWrapper
              resources={categoryResources.data}
              columns={categoryResourcesColumns}
              meta={categoryResources.meta}
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
