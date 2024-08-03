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
import { RoomService } from "@/services/roomService";
import { toast } from "react-toastify";
import { mutate } from "swr";

export const DeleteRoom = ({ roomId }: { roomId: number }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  
  const handleDeleteRoom = async () => {
    await RoomService.delete(roomId.toString());
    mutate((key) => Array.isArray(key) && key[0] === "/rooms");
    toast.success("Xóa phòng thí nghiệm thành công");
    onClose();
  };

  return (
    <>
      <div>
        <Tooltip content="Xóa phòng thí nghiệm" color="danger">
          <button onClick={onOpen}>
            <DeleteIcon size={20} fill="#FF0080" />
          </button>
        </Tooltip>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Xóa phòng thí nghiệm
              </ModalHeader>
              <ModalBody>
                <p>
                  Bạn có thật sự muốn xóa phòng thí nghiệm này không ? Hành động
                  này sẽ không thể hoàn tác
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Đóng
                </Button>
                <Button color="danger" onClick={handleDeleteRoom}>
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
