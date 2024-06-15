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
import { toast } from "react-toastify";
import { mutate } from "swr";
import type { UseDisclosureReturn } from '@nextui-org/use-disclosure';
import axios from "axios";
import { translateErrorMessage } from "@/utils/translateErrorMessage";
import { RoomResourceService } from "@/services/roomResourceService";

export const DeleteRoomResource = ({ resourceTransferedId, disclosure}: { resourceTransferedId: number, disclosure: UseDisclosureReturn }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = disclosure;

    const handleDeleteResource = async () => {
        try {
          const { data } = await RoomResourceService.delete(resourceTransferedId.toString())
          mutate((key) => typeof key === "string" && key.startsWith("/room-items/room/"));
          toast.success("Thu hồi tài nguyên thành công")
          onClose();
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const translatedErrorMessage = translateErrorMessage(error.response?.data.message)
            toast.error(translatedErrorMessage)
          }
        }
    }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Thu hồi tài nguyên</ModalHeader>
              <ModalBody>
                <p>
                  Bạn có thật sự muốn thu hồi tài nguyên này không ?
                  Hành động này sẽ không thể hoàn tác
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Đóng
                </Button>
                <Button color="danger" onClick={handleDeleteResource}>
                  Thu hồi
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
