import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";
import { EditIcon } from "../icons/table/edit-icon";
import { UpdateCategoryForm } from "../forms/categry-forms/update-category-form";
import {
  UpdateCategorySchema,
  UpdateCategorySchemaType,
} from "./schema/updateCategorySchema";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { CategoryService } from "@/services/categoryService";
import { mutate } from "swr";
import { toast } from "react-toastify";
import { Category } from "./category-table/data";

export const UpdateCategory = ({ category }: { category: Category }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const methods = useForm<UpdateCategorySchemaType>({
    resolver: zodResolver(UpdateCategorySchema),
  });

  useEffect(() => {
    if (!category) return;
    methods.reset({ ...category, categoryId: category.id });
  }, [category]);

  const onSubmit: SubmitHandler<UpdateCategorySchemaType> = async (data) => {
    setIsLoading(true);
    try {
      await CategoryService.update(category.id, data);
      mutate((key) => Array.isArray(key) && key[0] === "/categories");
      methods.reset();
      toast.success("Cập nhật danh mục thành công");
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    methods.clearErrors;
    onClose();
  };

  return (
    <>
      <div>
        <Tooltip content="Cập nhật danh mục" color="secondary">
          <button onClick={onOpen}>
            <EditIcon size={20} fill="#979797" />
          </button>
        </Tooltip>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Cập nhật danh mục
              </ModalHeader>
              <ModalBody>
                <form className="flex justify-between scrollbar scrollbar-thin overflow-y-auto">
                  <div className="w-full max-h-80">
                    <FormProvider {...methods}>
                      <UpdateCategoryForm />
                    </FormProvider>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onClick={handleCloseModal}
                >
                  Đóng
                </Button>
                <Button
                  color="primary"
                  variant="flat"
                  onClick={methods.handleSubmit(onSubmit)}
                  isLoading={isLoading}
                >
                  Cập nhật
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
