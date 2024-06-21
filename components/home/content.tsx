"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { CardEquipment } from "./card-equipment";
import { CardTool } from "./card-tool";
import { CardChemical } from "./card-chemical";
import { CardAgents } from "./card-";
import { CardTransactions } from "./card-latest-transfer-resource";
import { Link } from "@nextui-org/react";
import NextLink from "next/link";
import { useSession } from "next-auth/react";
import { UserService } from "@/services/userService";
import { AccountTableWrapper } from "../accounts/account-table/account-table";
import { Account } from "../accounts/account-table/data";
import { LoaderTable } from "../loader/loader-table";
import useSWR from "swr";
import { CategoryService } from "@/services/categoryService";
import { Category } from "../category/category-table/data";
import { CardCategory } from "./card-category";
import { accountsFetcher } from "@/utils/fetchers/account-fetchers.ts/accountsFetcher";
import { categoriesFetcher } from "@/utils/fetchers/category-fetchers.ts/categories-fetcher";

const colors = ["bg-default-50", "bg-success", "bg-primary"];

const Chart = dynamic(() => import("../charts/steam").then((mod) => mod.Steam), {
  ssr: false,
});

export const Content = () => {
  // const [accounts, setAccounts] = useState<Account[]>([])
  const { data: accounts, isLoading: isLoadingFetchAccountData } = useSWR(
    ["/users/get", { take: 5 }],
    ([url, queryParams]) => accountsFetcher(url, queryParams)
  );

  const {
    data: categories,
    isLoading: isFetchingCategories,
    mutate: updateCategoriesList,
  } = useSWR(['/categories', {}], ([url, queryParams]) => categoriesFetcher(url, queryParams));

  return (
    <div className="h-full lg:px-6">
      <div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
        <div className="mt-6 gap-6 flex flex-col w-full">
          {/* Card Section Top */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Tài nguyên phòng thí nghiệm</h3>
            <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5  justify-center w-full">
              {!isFetchingCategories &&
                categories?.data.map((category: Category, index: number) => {
                  const colorClass = colors[index % colors.length];
                  return <CardCategory key={index} category={category} colorClass={colorClass} />;
                })}
            </div>
          </div>

          {/* Chart */}
          <div className="h-full flex flex-col gap-2">
            <h3 className="text-xl font-semibold">
              Số liệu thống kê tài nguyên ở các phòng
            </h3>
            <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
              <Chart />
            </div>
          </div>
        </div>

        {/* Left Section */}
        <div className="mt-4 gap-2 flex flex-col xl:max-w-md w-full">
          <div className="flex flex-wrap justify-between items-center">
            <h3 className="text-xl font-semibold">Tài nguyên</h3>
            <Link href="/resources" as={NextLink} color="primary" className="cursor-pointer">
              Xem thêm
            </Link>
          </div>
          <div className="flex flex-col justify-center gap-4 flex-wrap md:flex-nowrap md:flex-col">
            <CardAgents />
            <CardTransactions />
          </div>
        </div>
      </div>

      {/* Table Latest Users */}
      <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0  max-w-[90rem] mx-auto gap-3">
        <div className="flex flex-wrap justify-between">
          <h3 className="text-center text-xl font-semibold">Accounts</h3>
          <Link href="/accounts" as={NextLink} color="primary" className="cursor-pointer">
            View All
          </Link>
        </div>
        {isLoadingFetchAccountData ? (
          <LoaderTable />
        ) : (
          <AccountTableWrapper accounts={accounts?.data} paginate={false} />
        )}
      </div>
    </div>
  );
};
