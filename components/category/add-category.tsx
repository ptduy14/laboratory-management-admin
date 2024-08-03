import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { AddCategorySchema, AddCategorySchemaType } from "./schema/addCategorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { CategoryService } from "@/services/categoryService";
import { toast } from "react-toastify";
import { AddCategoryForm } from "../forms/categry-forms/add-category-form";
import { useState } from "react";

export const AddCategory = ({ mutate }: { mutate: any }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const methods = useForm<AddCategorySchemaType>({ resolver: zodResolver(AddCategorySchema) });

  const onSubmit: SubmitHandler<AddCategorySchemaType> = async (data) => {
    setIsLoading(true)
    try {
      await CategoryService.create(data);
      mutate();
      methods.reset();
      toast.success("Thêm danh mục thành công");
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    } finally {
      setIsLoading(false)
    }
  };

  const handleCloseModal = () => {
    methods.clearErrors;
    onClose();
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>Thêm danh mục</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Thêm danh mục</ModalHeader>
              <ModalBody>
                <form className="flex justify-between scrollbar scrollbar-thin overflow-y-auto">
                  <div className="w-full max-h-80">
                    <FormProvider {...methods}>
                      <AddCategoryForm />
                    </FormProvider>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={handleCloseModal}>
                  Đóng
                </Button>
                <Button color="primary" variant="flat" onClick={methods.handleSubmit(onSubmit)} isLoading={isLoading}>
                  Thêm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
