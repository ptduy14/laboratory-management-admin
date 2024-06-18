import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Tooltip,
  Avatar,
  Chip,
} from "@nextui-org/react";
import { EyeIcon } from "@/components/icons/table/eye-icon";
import React, { useState, useEffect } from "react";
import { ResourceService } from "@/services/resourceService";
import { RoleNames } from "@/enums/role";
import { ResourceStatusName } from "@/enums/resource-status";
import { HandoverStatusName } from "@/enums/handover-status";
import { LoaderSkeletonForm } from "../loader/loader-skeleton-form";
import useSWR from "swr";
import { UnitEnumNames } from "@/enums/unit";
import type { UseDisclosureReturn } from "@nextui-org/use-disclosure";
import { RoomResourceService } from "@/services/roomResourceService";
import { registrationFetcher } from "@/utils/fetchers/registration-fetchers/registration-fetcher";
import { RegistrationDetail } from "./registration-table/data";
import { Account } from "../accounts/account-table/data";
import { accountFetcher } from "@/utils/fetchers/account-fetchers.ts/accountFetcher";
import { convertMillisecondsToDate } from "@/utils/convertMillisecondsToDate";

export const DetailRegistration = ({
  registrationId,
}: {
  registrationId: number;
}) => {
  // const [account, setAccount] = useState<Account>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: registration, isLoading: isFetchingRegistration } = useSWR<RegistrationDetail>(
    isOpen ? `/registration/${registrationId}` : null,
    registrationFetcher
  );

  const { data: account } = useSWR<Account>(
    registration && !isFetchingRegistration
      ? `/users/get/${registration?.registration.user.id}`
      : null,
    accountFetcher
  );
  console.log(`/users/get/${registration?.registration.user.id}`);

  return (
    <div>
        <Tooltip content="Chi tiết phiếu mượn">
          <button onClick={onOpen}>
            <EyeIcon size={20} fill="#979797" />
          </button>
        </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl" placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-semibold">Chi tiết phiếu mượn</h3>
                  <span className="text-sm text-gray-500">Thông tin chi tiết về phiếu mượn</span>
                </div>
              </ModalHeader>
              <ModalBody>
                {!isFetchingRegistration && registration && account ? (
                  <div className="space-y-4 scrollbar scrollbar-thin overflow-auto">
                    <div className="border-b pb-2 mb-4 border-gray-500">
                      <label className="flex items-center mb-1.5">
                        <span className="w-1/2 block font-semibold">Mã phiếu: </span>
                        <span className="w-1/2 block font-light text-sm">
                          {registration.registration.id}
                        </span>
                      </label>
                      <label className="flex items-center mb-1.5">
                        <span className="w-1/2 block font-semibold">Tên người mượn:</span>
                        <span className="w-1/2 block font-light text-sm">
                          {account?.lastName + account?.firstName}
                        </span>
                      </label>
                    </div>

                    {registration.items.map((resourceRegistration, index) => {
                      return (
                        <div key={index} className="border-b pb-2 mb-4 border-gray-500">
                          <div className="space-y-4">
                            <label className="flex items-center">
                              <span className="w-1/2 block font-semibold">Tên tài nguyên: </span>
                              <span className="w-1/2 block font-light text-sm">
                                {resourceRegistration.item.name}
                              </span>
                            </label>
                            <label className="flex items-center">
                              <span className="w-1/2 block font-semibold">Đã mượn: </span>
                              <span className="w-1/2 block font-light text-sm">
                                {resourceRegistration.quantity}
                              </span>
                            </label>
                            <label className="flex items-center">
                              <span className="w-1/2 block font-semibold">Đã trả: </span>
                              <span className="w-1/2 block font-light text-sm">
                                {resourceRegistration.quantityReturned}
                              </span>
                            </label>
                            <label className="flex items-center">
                              <span className="w-1/2 block font-semibold">Ngày mượn: </span>
                              <span className="w-1/2 block font-light text-sm">
                                {convertMillisecondsToDate(resourceRegistration.start_day)}
                              </span>
                            </label>
                            <label className="flex items-center">
                              <span className="w-1/2 block font-semibold">Ngày trả dự kiến: </span>
                              <span className="w-1/2 block font-light text-sm">
                                {convertMillisecondsToDate(resourceRegistration.end_day)}
                              </span>
                            </label>
                            <label className="flex items-center">
                              <span className="w-1/2 block font-semibold">Phòng: </span>
                              <span className="w-1/2 block font-light text-sm">
                                {resourceRegistration.room.name}
                              </span>
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <LoaderSkeletonForm />
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
