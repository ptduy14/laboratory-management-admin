import React from "react";
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
import { UpdateCategorySchema, UpdateCategorySchemaType } from "./schema/updateCategorySchema";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWR from "swr";
import axios from "axios";
import { CategoryService } from "@/services/categoryService";
import { mutate } from "swr";
import { toast } from "react-toastify";
import { LoaderSkeletonForm } from "../loader/loader-skeleton-form";

export const UpdateCategory = ({ categoryId }: { categoryId: number }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const methods = useForm<UpdateCategorySchemaType>({
    resolver: zodResolver(UpdateCategorySchema),
  });

  const { data: category, isLoading: isFetchingCategory } = useSWR(
    isOpen ? `/categories/${categoryId.toString()}` : null,
    async (url) => {
      const { data } = await CategoryService.getById(url);
      methods.reset({ ...data, categoryId: categoryId });
    }
  );

  const onSubmit: SubmitHandler<UpdateCategorySchemaType> = async (data) => {
    try {
      const { data: updatedCategory } = await CategoryService.update(categoryId, data);
      mutate(`/categories`);
      methods.reset();
      toast.success("Cập nhật danh mục thành công");
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
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
              <ModalHeader className="flex flex-col gap-1">Cập nhật danh mục</ModalHeader>
              <ModalBody>
                {isFetchingCategory ? (
                  <LoaderSkeletonForm />
                ) : (
                  <form className="flex justify-between scrollbar scrollbar-thin overflow-y-auto">
                    <div className="w-full max-h-80">
                      <FormProvider {...methods}>
                        <UpdateCategoryForm />
                      </FormProvider>
                    </div>
                  </form>
                )}
              </ModalBody>
              {isFetchingCategory || (
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={handleCloseModal}>
                    Đóng
                  </Button>
                  <Button color="primary" variant="flat" onClick={methods.handleSubmit(onSubmit)}>
                    Cập nhật
                  </Button>
                </ModalFooter>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
