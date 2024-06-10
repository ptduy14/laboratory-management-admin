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

export const DetailResource = ({ resourceId }: { resourceId: number }) => {
  // const [account, setAccount] = useState<Account>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: resource, isLoading: isFetchingResource } = useSWR<Resource>(isOpen ? `/items/${resourceId.toString()}` : null, async (url: string) => {
      const { data } = await ResourceService.getById(url);
      return data;
    }
  );

  console.log(resource)

  return (
    <div>
      <div>
        <Tooltip content="Details">
          <button onClick={onOpen}>
            <EyeIcon size={20} fill="#979797" />
          </button>
        </Tooltip>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Chi tiết tài nguyên
              </ModalHeader>
              <ModalBody>
                {!isFetchingResource && resource ? (
                  <div className="space-y-4">
                    <label className="flex mb-1.5">
                      <span className="w-1/2 block font-semibold">
                        Resource id
                      </span>
                      <span className="w-1/2 block font-light">
                        {resourceId}
                      </span>
                    </label>
                    <label className="flex mb-1.5">
                      <span className="w-1/2 block font-semibold">
                        Tên tài nguyên
                      </span>
                      <span className="w-1/2 block font-light">
                        {resource.name}
                      </span>
                    </label>
                    <label className="flex mb-1.5">
                      <span className="w-1/2 block font-semibold">Xuất xứ</span>
                      <span className="w-1/2 block font-light">
                        {resource.origin || "-"}
                      </span>
                    </label>
                    <label className="flex mb-1.5">
                      <span className="w-1/2 block font-semibold">Số seri</span>
                      <span className="w-1/2 block font-light">
                        {resource.serial_number || "-"}
                      </span>
                    </label>
                    <label className="flex mb-1.5">
                      <span className="w-1/2 block font-semibold">
                        Dung tích
                      </span>
                      <span className="w-1/2 block font-light">
                        {resource.specification || "-"}
                      </span>
                    </label>
                    <label className="flex mb-1.5">
                      <span className="w-1/2 block font-semibold">
                        Số lượng
                      </span>
                      <span className="w-1/2 block font-light">
                        {resource.quantity || "-"}
                      </span>
                    </label>
                    <label className="flex mb-1.5">
                      <span className="w-1/2 block font-semibold">
                        Chú thích
                      </span>
                      <span className="w-1/2 block font-light">
                        {resource.remark || "-"}
                      </span>
                    </label>
                    <label className="flex mb-1.5">
                      <span className="w-1/2 block font-semibold">Đơn vị</span>
                      <span className="w-1/2 block font-light">
                        {resource.unit || "-"}
                      </span>
                    </label>
                    <label className="flex mb-1.5">
                      <span className="w-1/2 block font-semibold">
                        Trạng thái:
                      </span>
                      <span className="w-1/2 block font-light">
                        <Chip
                          size="sm"
                          variant="flat"
                          color={
                            Number(resource.status) === 0 || Number(resource.status) === 1
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
                    <label className="flex mb-1.5">
                      <span className="w-1/2 block font-semibold">
                        Trạn thái bàn giao
                      </span>
                      <span className="w-1/2 block font-light">
                        {HandoverStatusName[resource.handoverStatus]}
                      </span>
                    </label>
                    <label className="flex mb-1.5">
                      <span className="w-1/2 block font-semibold">
                        Danh mục
                      </span>
                      <span className="w-1/2 block font-light">
                        {resource.category.name}
                      </span>
                    </label>
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
