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
import { CategoryService } from "@/services/categoryService";
import { toast } from "react-toastify";
import { mutate } from "swr";

export const DeleteCategory = ({ categoryId }: { categoryId: number }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const handleDeleteCategory = async () => {
        const { data } = await CategoryService.delete(categoryId.toString())
        mutate(`/categories`);
        toast.success("Xóa category thành công")
        onClose();
    }

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
              <ModalHeader className="flex flex-col gap-1">Xóa danh mục</ModalHeader>
              <ModalBody>
                <p>
                  Bạn có thật sự muốn xóa danh mục này không ?
                  Hành động này sẽ không thể hoàn tác
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Đóng
                </Button>
                <Button color="danger" onClick={handleDeleteCategory}>
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
