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
import useSWR from "swr";
import { useEffect, useState } from "react";
import { registrationsFetcher } from "@/utils/fetchers/registration-fetchers/registrations-fetcher";
import { RegistrationTableWrapper } from "./registration-table/registration-table";
import { Registration, registraionColumns } from "./registration-table/data";
import { QueryParams } from "@/types/query-params";
import { RegistrationStatus } from "@/enums/registration-status";
import { ChevronDownIcon } from "../icons/chevron-down-icon";
export const ApprovedRegistrations = () => {
  const [queryParams, setQueryParams] = useState<QueryParams>({
    status: [RegistrationStatus.APPROVED],
  });
  const [typeAccountsFilter, setTypeAccountsFilter] = useState<Selection>("all");

  const {
    data: registrations,
    isLoading: isFetchingRegistrations,
    mutate,
  } = useSWR([`/registration`, queryParams], ([url, queryParams]) =>
    registrationsFetcher(url, queryParams)
  );

  useEffect(() => {
    if (typeAccountsFilter !== "all") {
      const typeAccountsFilterKey = Array.from(typeAccountsFilter);
      const typeAccountsFilterString = typeAccountsFilterKey.map((item) => String(item));

      setQueryParams((prev) => ({ ...prev, user: typeAccountsFilterString }));
    }
  }, [typeAccountsFilter]);

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
          <span>Phiếu mượn</span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>List</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Danh sách các phiếu mượn đã duyệt</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            isClearable
            placeholder="Tìm kiếm"
            // value={valueSearch}
            // onValueChange={(value) => setValueSearch(value)}
          />
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                Người mượn
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table type accounts"
              closeOnSelect={false}
              selectedKeys={typeAccountsFilter}
              selectionMode="multiple"
              onSelectionChange={setTypeAccountsFilter}>
              <DropdownItem key="@ctuet.edu.vn" className="capitalize">
                Giảng viên
              </DropdownItem>
              <DropdownItem key="@student.ctuet.edu.vn" className="capitalize">
                Sinh viên
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        {!isFetchingRegistrations ? (
          <RegistrationTableWrapper
            registrations={registrations.data}
            registrationColumns={registraionColumns}
            meta={registrations.meta}
            setPage={setQueryParams}
          />
        ) : (
          <LoaderTable />
        )}
      </div>
    </div>
  );
};
