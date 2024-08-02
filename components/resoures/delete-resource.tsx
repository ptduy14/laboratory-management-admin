import React, { useState } from "react";
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
import type { UseDisclosureReturn } from "@nextui-org/use-disclosure";
import axios from "axios";
import { translateErrorMessage } from "@/utils/translateErrorMessage";
import { Resource } from "./resource-table/data";

export const DeleteResource = ({
  resource,
  disclosure,
}: {
  resource: Resource;
  disclosure: UseDisclosureReturn;
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = disclosure;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDeleteResource = async () => {
    setIsLoading(true);
    try {
      const { data } = await ResourceService.delete(resource.id.toString());
      mutate((key) => Array.isArray(key) && key[0] === "/items");
      mutate((key) => Array.isArray(key) && key[0].startsWith(`/items/category/`));
      toast.success("Xóa tài nguyên thành công");
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const translatedErrorMessage = translateErrorMessage(error.response?.data.message);
        toast.error(translatedErrorMessage);
      }
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Xóa tài nguyên</ModalHeader>
              <ModalBody>
                <p>
                  Bạn có thật sự muốn xóa tài nguyên này không ? Hành động này sẽ không thể hoàn tác
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Đóng
                </Button>
                <Button color="danger" onClick={handleDeleteResource} isLoading={isLoading}>
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
