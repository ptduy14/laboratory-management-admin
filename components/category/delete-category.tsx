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
import { CategoryService } from "@/services/categoryService";
import { toast } from "react-toastify";
import { mutate } from "swr";
import axios from "axios";
import { translateErrorMessage } from "@/utils/translateErrorMessage";

export const DeleteCategory = ({ categoryId }: { categoryId: number }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDeleteCategory = async () => {
    setIsLoading(true)
    try {
      await CategoryService.delete(categoryId.toString());
      mutate((key) => Array.isArray(key) && key[0] === "/categories");
      toast.success("Xóa category thành công");
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(translateErrorMessage(error.response?.data.message))
      }
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <>
      <div>
        <Tooltip content="Xóa danh mục" color="danger">
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
                Xóa danh mục
              </ModalHeader>
              <ModalBody>
                <p>
                  Bạn có thật sự muốn xóa danh mục này không ? Hành động này sẽ
                  không thể hoàn tác
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Đóng
                </Button>
                <Button color="danger" onClick={handleDeleteCategory} isLoading={isLoading}>
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
