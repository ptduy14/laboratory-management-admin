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
import { ResourcesTransfered } from "./room-resources-table/data";
import { RoleNames } from "@/enums/role";
import { ResourceStatusName } from "@/enums/resource-status";
import { HandoverStatusName } from "@/enums/handover-status";
import { LoaderSkeletonForm } from "../loader/loader-skeleton-form";
import useSWR from "swr";
import { UnitEnumNames } from "@/enums/unit";
import type { UseDisclosureReturn } from "@nextui-org/use-disclosure";
import { RoomResourceService } from "@/services/roomResourceService";
import { formatDateTime } from "@/utils/formatDateTime";

export const DetailRoomResource = ({
  resourceTransferedId,
  disclosure,
}: {
  resourceTransferedId: number;
  disclosure: UseDisclosureReturn;
}) => {
  // const [account, setAccount] = useState<Account>();
  const { isOpen, onOpen, onOpenChange } = disclosure;

  const { data: resourceTransfered, isLoading: isFetchingResourceTransfered } = useSWR(
    isOpen ? `/room-items/${resourceTransferedId.toString()}` : null,
    async (url) => {
      const { data } = await RoomResourceService.getResourceTransferedById(url);
      return data;
    }
  );

  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl" placement="top-center">
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
                {!isFetchingResourceTransfered && resourceTransfered ? (
                  <div className="space-y-4 scrollbar scrollbar-thin overflow-y-auto h-96">
                    <div className="border-b pb-2 mb-4 border-gray-500">
                      <label className="flex items-center mb-1.5">
                        <span className="w-1/2 block font-semibold">Resource id:</span>
                        <span className="w-1/2 block font-light text-sm">
                          {resourceTransfered.item.id}
                        </span>
                      </label>
                      <label className="flex items-center mb-1.5">
                        <span className="w-1/2 block font-semibold">Tên tài nguyên:</span>
                        <span className="w-1/2 block font-light text-sm">
                          {resourceTransfered.item.name}
                        </span>
                      </label>
                    </div>
                    <div className=" pb-2 mb-4 border-gray-500">
                      <div className="grid grid-cols-2 gap-y-4">
                        <label className="flex flex-col">
                          <span className="block font-semibold">Xuất xứ:</span>
                          <span className="block font-light text-sm">
                            {resourceTransfered.item.origin || "-"}
                          </span>
                        </label>
                        <label className="flex flex-col">
                          <span className="block font-semibold">Số seri:</span>
                          <span className="block font-light text-sm">
                            {resourceTransfered.item.serial_number || "-"}
                          </span>
                        </label>
                        <label className="flex flex-col">
                          <span className="block font-semibold">Dung tích:</span>
                          <span className="block font-light text-sm">
                            {resourceTransfered.item.specification || "-"}
                          </span>
                        </label>
                        <label className="flex flex-col">
                          <span className="block font-semibold">Số lượng:</span>
                          <span className="block font-light text-sm">
                            {resourceTransfered.quantity || "-"}
                          </span>
                        </label>
                        <label className="flex flex-col">
                          <span className="block font-semibold">Đơn vị:</span>
                          <span className="block font-light text-sm">
                            {UnitEnumNames[resourceTransfered.item.unit]}
                          </span>
                        </label>
                        <label className="flex flex-col">
                          <span className="block font-semibold">Đã mượn</span>
                          <span className="block font-light text-sm">
                            {resourceTransfered.itemQuantityBorrowed}
                          </span>
                        </label>
                        <label className="flex flex-col">
                          <span className="block font-semibold">Đã trả</span>
                          <span className="block font-light text-sm">
                            {resourceTransfered.item.itemQuantityReturned || 0}
                          </span>
                        </label>
                        <label className="flex flex-col">
                          <span className="block font-semibold">Ngày bàn giao</span>
                          <span className="block font-light text-sm">
                            {formatDateTime(resourceTransfered.createdAt).formattedDate}
                          </span>
                        </label>
                        <label className="flex flex-col">
                          <span className="block font-semibold">Trạng thái:</span>
                          <span className="block font-light text-sm">
                            <Chip
                              size="sm"
                              variant="flat"
                              color={
                                Number(resourceTransfered.item.status) === 0 ||
                                Number(resourceTransfered.item.status) === 1
                                  ? "success"
                                  : Number(resourceTransfered.item.status) === 2
                                  ? "warning"
                                  : "danger"
                              }>
                              <span className="capitalize text-xs">
                                {ResourceStatusName[resourceTransfered.item.status]}
                              </span>
                            </Chip>
                          </span>
                        </label>
                      </div>
                    </div>
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
