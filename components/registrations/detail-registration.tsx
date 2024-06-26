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
import { Registration, RegistrationDetail } from "./registration-table/data";
import { Account } from "../accounts/account-table/data";
import { accountFetcher } from "@/utils/fetchers/account-fetchers.ts/accountFetcher";
import { convertMillisecondsToDate } from "@/utils/convertMillisecondsToDate";
import { roomFetcher } from "@/utils/fetchers/room-fetchers.ts/room-fetcher";
import { fetchAllRegistrationResources } from "@/utils/fetchers/registration-fetchers/registration-resources-fetcher";
import axios from "axios";

export const DetailRegistration = ({ registration }: { registration: Registration }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: registrationDetail, isLoading: isFetchingRegistrationDetail } = useSWR<RegistrationDetail>(
    isOpen ? `/registration/${registration.id}` : null,
    registrationFetcher
  );

  const { data: registrationResources, isLoading: isFetchingRegistrationResources } = useSWR(!isFetchingRegistrationDetail ? ['registrationResource', registrationDetail] : null, ([key, registrationDetail]) => fetchAllRegistrationResources(key, registrationDetail))

  console.log(!isFetchingRegistrationDetail && registrationDetail);
  console.log(!isFetchingRegistrationResources && registrationResources);

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
                {!isFetchingRegistrationDetail && registrationDetail && !isFetchingRegistrationResources && registrationResources ? (
                  <div className="space-y-4 scrollbar scrollbar-thin overflow-auto">
                    <div className="border-b pb-2 mb-4 border-gray-500">
                      <label className="flex items-center mb-1.5">
                        <span className="w-1/2 block font-semibold">Mã phiếu: </span>
                        <span className="w-1/2 block font-light text-sm">
                          {registrationDetail.registration.id}
                        </span>
                      </label>
                      <label className="flex items-center mb-1.5">
                        <span className="w-1/2 block font-semibold">Tên người mượn:</span>
                        <span className="w-1/2 block font-light text-sm">
                          {`${registration.user.lastName} ${registration.user.firstName}`}
                        </span>
                      </label>
                    </div>

                    {registrationResources.map((registrationResource, index) => {
                      return (
                        <div key={index} className="border-b pb-2 mb-4 border-gray-500">
                          <div className="space-y-4">
                            <label className="flex items-center">
                              <span className="w-1/2 block font-semibold">Tên tài nguyên: </span>
                              <span className="w-1/2 block font-light text-sm">
                                {registrationResource.item.name}
                              </span>
                            </label>
                            <label className="flex items-center">
                              <span className="w-1/2 block font-semibold">Đã mượn: </span>
                              <span className="w-1/2 block font-light text-sm">
                                {registrationDetail.items[index].quantity}
                              </span>
                            </label>
                            <label className="flex items-center">
                              <span className="w-1/2 block font-semibold">Đã trả: </span>
                              <span className="w-1/2 block font-light text-sm">
                              {registrationDetail.items[index].quantityReturned}
                              </span>
                            </label>
                            <label className="flex items-center">
                              <span className="w-1/2 block font-semibold">Ngày mượn: </span>
                              <span className="w-1/2 block font-light text-sm">
                                {convertMillisecondsToDate(registrationDetail.items[index].start_day)}
                              </span>
                            </label>
                            <label className="flex items-center">
                              <span className="w-1/2 block font-semibold">Ngày trả dự kiến: </span>
                              <span className="w-1/2 block font-light text-sm">
                                {convertMillisecondsToDate(registrationDetail.items[index].end_day)}
                              </span>
                            </label>
                            <label className="flex items-center">
                              <span className="w-1/2 block font-semibold">Phòng: </span>
                              <span className="w-1/2 block font-light text-sm">
                                {registrationResource.room.name}
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
