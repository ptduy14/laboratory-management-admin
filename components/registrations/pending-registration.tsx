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
import { RegistrationsApprovePayload } from "@/types/registration";
import { RegistrationService } from "@/services/registrationService";
import { toast } from "react-toastify";
import axios from "axios";

export const PendingRegistrations = () => {
  const [queryParams, setQueryParams] = useState<QueryParams>({
    status: [RegistrationStatus.PENDING],
  });
  const [typeAccountsFilter, setTypeAccountsFilter] = useState<Selection>("all");
  const [selectedRegistrations, setSeletedRegistrations] = useState<Set<string | number> | "all">();
  const [isLoadingHandleApprove, setIsLoadingHandleApprove] = useState(false);
  const [isLoadingHandleReject, setIsLoadingHandleReject] = useState(false);

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

  const handleUpdateRegistrations = async (action: string) => {
    try {
      action === "approve" ? setIsLoadingHandleApprove(true) : setIsLoadingHandleReject(true);
      const payload: RegistrationsApprovePayload = { items: [] };
      if (selectedRegistrations === "all") {
        const { data: Allregistrations } = await registrationsFetcher(`/registration`, {
          ...queryParams,
          take: 50,
        });
        Allregistrations.forEach((registration: Registration) => {
          payload.items.push({
            id: registration.id,
            status:
            action === "approve" ? RegistrationStatus.APPROVED : RegistrationStatus.CANCELED,
          });
        });
      }

      if (selectedRegistrations instanceof Set) {
        selectedRegistrations.forEach((id) =>
          payload.items.push({
            id: Number(id),
            status:
            action === "approve" ? RegistrationStatus.APPROVED : RegistrationStatus.CANCELED,
          })
        );
      }

      const { data } = await RegistrationService.approveRegistrations(payload);
      console.log(payload);
      toast.success("Duyệt phiếu mượn thành công");
      mutate();

      action === "approve" ? setIsLoadingHandleApprove(false) : setIsLoadingHandleReject(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
      action === "approve" ? setIsLoadingHandleApprove(false) : setIsLoadingHandleReject(false);
    }
  };

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

      <h3 className="text-xl font-semibold">Danh sách các phiếu mượn chờ duyệt</h3>
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
        <div className="flex flex-row gap-3.5 flex-wrap">
          <Button
            color="primary"
            isDisabled={
              !selectedRegistrations ||
              Array.from(selectedRegistrations).length === 0 ||
              isLoadingHandleReject
            }
            onClick={() => handleUpdateRegistrations("approve")}
            isLoading={isLoadingHandleApprove}>
            Duyệt mượn
          </Button>
          <Button
            color="danger"
            isDisabled={
              !selectedRegistrations ||
              Array.from(selectedRegistrations).length === 0 ||
              isLoadingHandleApprove
            }
            onClick={() => handleUpdateRegistrations("reject")}
            isLoading={isLoadingHandleReject}>
            Từ chối
          </Button>
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        {!isFetchingRegistrations ? (
          <RegistrationTableWrapper
            registrations={registrations.data}
            registrationColumns={registraionColumns}
            meta={registrations.meta}
            setPage={setQueryParams}
            reletedRegistrations={{ selectedRegistrations, setSeletedRegistrations }}
          />
        ) : (
          <LoaderTable />
        )}
      </div>
    </div>
  );
};
