import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { ResourceService } from "@/services/resourceService";
import { toast } from "react-toastify";
import { mutate } from "swr";
import type { UseDisclosureReturn } from '@nextui-org/use-disclosure';

export const DeleteResource = ({ resourceId, disclosure}: { resourceId: number, disclosure: UseDisclosureReturn }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = disclosure;

    const handleDeleteResource = async () => {
        const { data } = await ResourceService.delete(resourceId.toString())
        mutate((key) => typeof key === "string" && key.startsWith(`/items?page=`));
        mutate((key) => typeof key === "string" && key.startsWith(`/items/category/`));
        toast.success("Xóa tài nguyên thành công")
        onClose();
    }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Xóa tài nguyên</ModalHeader>
              <ModalBody>
                <p>
                  Bạn có thật sự muốn xóa tài nguyên này không ?
                  Hành động này sẽ không thể hoàn tác
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Đóng
                </Button>
                <Button color="danger" onClick={handleDeleteResource}>
                  Xóa
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
