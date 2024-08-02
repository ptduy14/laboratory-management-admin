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
import { Resource } from "./resource-table/data";
import { RoleNames } from "@/enums/role";
import { ResourceStatusName } from "@/enums/resource-status";
import { HandoverStatusName } from "@/enums/handover-status";
import { LoaderSkeletonForm } from "../loader/loader-skeleton-form";
import useSWR from "swr";
import { UnitEnumNames } from "@/enums/unit";
import type { UseDisclosureReturn } from "@nextui-org/use-disclosure";
import { RoomResourceService } from "@/services/roomResourceService";
import { resourceFetcher } from "@/utils/fetchers/resource-fetchers.ts/resource-fetcher";
import { roomResourceFetcher } from "@/utils/fetchers/room-resource-fetchers/room-resource-fetch";

export const DetailResource = ({
  resourceId,
  resource,
  disclosure,
}: {
  resourceId: number;
  resource: Resource;
  disclosure: UseDisclosureReturn;
}) => {
  // const [account, setAccount] = useState<Account>();
  const { isOpen, onOpen, onOpenChange } = disclosure;

  // const { data: resource, isLoading: isFetchingResource } = useSWR<Resource>(
  //   isOpen ? `/items/${resourceId.toString()}` : null,
  //   resourceFetcher
  // );

  const {
    data: resourceTransferedInfo,
    isLoading: isFetchingResourceTransferedInfo,
  } = useSWR(
    isOpen ? `room-items/item/${resourceId.toString()}` : null,
    roomResourceFetcher
  );

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-semibold">Chi tiết tài nguyên</h3>
                  <span className="text-sm text-gray-500">
                    Thông tin chi tiết về tài nguyên đã chọn
                  </span>
                </div>
              </ModalHeader>
              <ModalBody>
                {resource ? (
                  <div className="space-y-4 scrollbar scrollbar-thin overflow-y-auto h-96">
                    <div className="border-b pb-2 mb-4 border-gray-500">
                      <label className="flex items-center mb-1.5">
                        <span className="w-1/2 block font-semibold">
                          Resource id:
                        </span>
                        <span className="w-1/2 block font-light text-sm">
                          {resourceId}
                        </span>
                      </label>
                      <label className="flex items-center mb-1.5">
                        <span className="w-1/2 block font-semibold">
                          Tên tài nguyên:
                        </span>
                        <span className="w-1/2 block font-light text-sm">
                          {resource.name}
                        </span>
                      </label>
                    </div>
                    <div className="border-b pb-2 mb-4 border-gray-500">
                      <div className="grid grid-cols-2 gap-y-4">
                        <label className="flex flex-col">
                          <span className="block font-semibold">Xuất xứ:</span>
                          <span className="block font-light text-sm">
                            {resource.origin || "-"}
                          </span>
                        </label>
                        <label className="flex flex-col">
                          <span className="block font-semibold">Số seri:</span>
                          <span className="block font-light text-sm">
                            {resource.serial_number || "-"}
                          </span>
                        </label>
                        <label className="flex flex-col">
                          <span className="block font-semibold">
                            Dung tích:
                          </span>
                          <span className="block font-light text-sm">
                            {resource.specification || "-"}
                          </span>
                        </label>
                        <label className="flex flex-col">
                          <span className="block font-semibold">Số lượng:</span>
                          <span className="block font-light text-sm">
                            {resource.quantity || "-"}
                          </span>
                        </label>
                        <label className="flex flex-col">
                          <span className="block font-semibold">Đơn vị:</span>
                          <span className="block font-light text-sm">
                            {UnitEnumNames[resource.unit]}
                          </span>
                        </label>
                        <label className="flex flex-col">
                          <span className="block font-semibold">
                            Đã bàn giao
                          </span>
                          <span className="block font-light text-sm">
                            {resource.handover}
                          </span>
                        </label>
                        <label className="flex flex-col">
                          <span className="block font-semibold">
                            Chú thích:
                          </span>
                          <span className="block font-light text-sm">
                            {resource.remark || "-"}
                          </span>
                        </label>
                        <label className="flex flex-col">
                          <span className="block font-semibold">Có sẵng</span>
                          <span className="block font-light text-sm">
                            {resource.quantity - resource.handover}
                          </span>
                        </label>
                        <label className="flex flex-col">
                          <span className="block font-semibold">
                            Trạng thái:
                          </span>
                          <span className="block font-light text-sm">
                            <Chip
                              size="sm"
                              variant="flat"
                              color={
                                Number(resource.status) === 0 ||
                                Number(resource.status) === 1
                                  ? "success"
                                  : Number(resource.status) === 2
                                  ? "warning"
                                  : "danger"
                              }
                            >
                              <span className="capitalize text-xs">
                                {ResourceStatusName[resource.status]}
                              </span>
                            </Chip>
                          </span>
                        </label>
                        <label className="flex flex-col">
                          <span className="block font-semibold">Danh mục:</span>
                          <span className="block font-light text-sm">
                            {resource.category.name}
                          </span>
                        </label>
                      </div>
                    </div>
                    {!isFetchingResourceTransferedInfo &&
                      resourceTransferedInfo.meta.numberRecords > 0 && (
                        <>
                          <span className="text-sm text-gray-500">
                            Thông tin về trạng thái bàn giao
                          </span>
                          <div className="grid grid-cols-2 gap-y-4">
                            {resourceTransferedInfo.data.map((item: any) => {
                              return (
                                <>
                                  <label className="flex flex-col">
                                    <span className="block font-semibold">
                                      Tên phòng:
                                    </span>
                                    <span className="block font-light text-sm">
                                      {item.room.name}
                                    </span>
                                  </label>
                                  <label className="flex flex-col">
                                    <span className="block font-semibold">
                                      Số lượng bàn giao:
                                    </span>
                                    <span className="block font-light text-sm">
                                      {item.quantity}
                                    </span>
                                  </label>
                                </>
                              );
                            })}
                          </div>
                        </>
                      )}
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
