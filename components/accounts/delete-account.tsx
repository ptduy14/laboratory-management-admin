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
import { AccountService } from "@/services/accountService";
import { toast } from "react-toastify";
import { mutate } from "swr";

export const DeleteAccount = ({ accountId }: { accountId: number }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const handleDeleteAccount = async () => {
        const { data } = await AccountService.delete(accountId.toString())
        mutate((key) => typeof key === "string" && key.startsWith("/users/get?page="));
        toast.success("Xóa account thành công")
        onClose();
    }

  return (
    <>
     <div>
     <Tooltip content="Xóa account" color="danger">
        <button onClick={onOpen}>
          <DeleteIcon size={20} fill="#FF0080" />
        </button>
      </Tooltip>
     </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Xóa account</ModalHeader>
              <ModalBody>
                <p>
                  Bạn có thật sự muốn xóa account này không ?
                  Hành động này sẽ không thể hoàn tác
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Đóng
                </Button>
                <Button color="danger" onClick={handleDeleteAccount}>
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