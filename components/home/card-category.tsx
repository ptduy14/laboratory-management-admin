import { Card, CardBody } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Community } from "../icons/community";
import { Category } from "../category/category-table/data";
import { ResourceService } from "@/services/resourceService";
import useSWR from "swr";
import { Resource } from "../resoures/resource-table/data";
import { categoryResourcesFetcher } from "@/utils/fetchers/category-resource-fetchers/category-resources-fetcher";

export const CardCategory = ({ category, colorClass }: {category: Category, colorClass: string}) => {
  const [totalItems, setTotalItems] = useState<number>(0)
  const [totalHandoverItems, setTotalHandoverItems] = useState<number>(0)

  const {
    data: resourcesFromCategory,
    isLoading: isFetchingResourcesFromCategory,
    mutate: updateResourcesFormCategoryList,
  } = useSWR([`/items/category/${category.id}`, {take: 50}], ([url, queryParams]) => categoryResourcesFetcher(url, queryParams));

  useEffect(() => {
    const totalItems: number = resourcesFromCategory?.data.reduce((accumulator: number, current: Resource) => {
      return accumulator + current.quantity
    }, 0)
    setTotalItems(totalItems)

    const totalHandoverItems: number = resourcesFromCategory?.data.reduce((accumulator: number, current: Resource) => {
      return accumulator + current.handover;
    }, 0)
    setTotalHandoverItems(totalHandoverItems) 
  }, [isFetchingResourcesFromCategory, resourcesFromCategory])

  return (
    <Card className={`xl:max-w-sm ${colorClass} rounded-xl shadow-md px-3 w-full`}>
      <CardBody className="py-5">
        <div className="flex gap-2.5 items-center">
          <Community />
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg">{category.name}</span>
            <span className="text-white text-sm">
              Tổng số: {totalItems} {category.name}
            </span>
          </div>
        </div>
        <div className="mt-4">
          <span className="block text-white text-lg font-semibold">Đã bàn giao: {totalHandoverItems} {category.name}</span>
        </div>
        <div className="flex mt-4 space-x-6">
          <div className="text-center">
            <span className="block text-xs text-danger font-semibold">↓ 100,930</span>
            <span className="text-white text-xs">USD</span>
          </div>
          <div className="text-center">
            <span className="block text-xs text-success font-semibold">↑ 4,120</span>
            <span className="text-white text-xs">USD</span>
          </div>
          <div className="text-center">
            <span className="block text-xs text-yellow-500 font-semibold">⭐ 125</span>
            <span className="text-white text-xs">VIP</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
