"use client";
import Link from "next/link";
import { HouseIcon } from "../icons/breadcrumb/house-icon";
import useSWR from "swr";
import { AddCategory } from "./add-category";
import { Button } from "@nextui-org/react";
import { ExportIcon } from "../icons/accounts/export-icon";
import { CategoryTableWrapper } from "./category-table/category-table";
import { CategoryColumns } from "./category-table/data";
import { LoaderTable } from "../loader/loader-table";
import { useState } from "react";
import { QueryParams } from "@/types/query-params";
import { categoriesFetcher } from "@/utils/fetchers/category-fetchers.ts/categories-fetcher";

export const Categories = () => {
  const [queryParams, setQueryParams] = useState<QueryParams>({});
  const {
    data: categories,
    isLoading: isFetchingCategories,
    mutate: updateCategoriesList,
  } = useSWR(['/categories', queryParams], ([url, queryParams]) => categoriesFetcher(url, queryParams));

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
          <span>Danh mục</span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>List</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Tất cả danh mục</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex flex-row gap-3.5 flex-wrap">
          <AddCategory mutate={updateCategoriesList} />
          <Button color="primary" startContent={<ExportIcon />}>
            Export to CSV
          </Button>
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        {!isFetchingCategories && categories ? (
          <CategoryTableWrapper categories={categories.data} columns={CategoryColumns} />
        ) : (
          <LoaderTable />
        )}
      </div>
    </div>
  );
};
