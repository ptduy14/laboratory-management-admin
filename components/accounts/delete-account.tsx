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
import { AccountService } from "@/services/accountService";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { Account } from "./account-table/data";
import { getPublicIdFromUrl } from "@/utils/getPublicIdFromUrl";
import { CloudinaryService } from "@/services/cloudinaryService";

export const DeleteAccount = ({ account }: { account: Account }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDeleteAccount = async () => {
    setIsLoading(!isLoading)
    if (account.photo) {
      let publicId = getPublicIdFromUrl(account.photo);
      const data = await CloudinaryService.deleteImg(publicId!);
    }
    const { data } = await AccountService.delete(account.id.toString());
    mutate((key) => Array.isArray(key) && key[0] === "/users/get");
    toast.success("Xóa account thành công");
    setIsLoading(!isLoading)
    onClose();
  };

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
                  Bạn có thật sự muốn xóa account này không ? Hành động này sẽ không thể hoàn tác
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Đóng
                </Button>
                <Button color="danger" onClick={handleDeleteAccount} isLoading={isLoading}>
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
