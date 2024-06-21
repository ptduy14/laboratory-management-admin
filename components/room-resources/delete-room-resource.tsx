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
import { ResourcesTransfered } from "./room-resources-table/data";

export const DeleteRoomResource = ({ resourceTransfered, disclosure}: { resourceTransfered: ResourcesTransfered, disclosure: UseDisclosureReturn }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = disclosure;

    const handleDeleteResource = async () => {
        try {
          const currentRoomId = resourceTransfered.room.id;
          const { data } = await RoomResourceService.delete(resourceTransfered.id.toString())
          mutate((key) => Array.isArray(key) && key[0] === `/room-items/room/${currentRoomId}`)
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
