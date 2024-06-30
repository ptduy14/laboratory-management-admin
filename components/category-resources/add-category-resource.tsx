import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
  } from "@nextui-org/react";
  import React, { useEffect, useState } from "react";
  import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { EyeFilledIcon } from "../icons/EyeFilledIcon";
  import { EyeSlashFilledIcon } from "../icons/EyeSlashFilledIcon";
  import { toast } from "react-toastify";
  import axios, { Method } from "axios";
  import { UnitEnum, UnitEnumNames } from "@/enums/unit";
  import { ResourceStatus, ResourceStatusName } from "@/enums/resource-status";
  import { CategoryService } from "@/services/categoryService";
  import useSWR from "swr";
  import {
    AddResourceCommonSchema,
    AddResourceChemicalSchema,
    AddResourceSchemaUnionType,
  } from "../resoures/schema/addResourceSchema";
  import { AddResourceCommonForm } from "../forms/resource-forms/add-resource-common-form";
  import { Category } from "../category/category-table/data";
  import { z } from "zod";
  import { ResourceService } from "@/services/resourceService";
  import { translateErrorMessage } from "@/utils/translateErrorMessage";
  
  export const AddCategoryResource = ({ mutate, category } : { mutate: any, category: Category}) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [isChemicalFieldVisible, setIsChemicalFieldVisible] = useState<boolean>(category.name === "Hóa chất" ? true : false);
  
    const methods = useForm<AddResourceSchemaUnionType>({
      defaultValues: {
        categoryId: category.id
      },
      resolver: zodResolver(category.name === "Hóa chất" ? AddResourceChemicalSchema : AddResourceCommonSchema),
    });

    const onSubmit: SubmitHandler<AddResourceSchemaUnionType> = async (data) => {
      try {
        const { data: newResource } = await ResourceService.create(data);
        methods.reset()
        mutate();
        toast.success(`Thêm ${category.name.toLowerCase()} mới thành công`)
        onClose()
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const translatedErrorMessage = translateErrorMessage(error.response?.data.message[0])
          toast.error(translatedErrorMessage)
        }
      }
    }
  
    const handleCloseModal = () => {
      methods.clearErrors()
      onClose();
    };
  
    return (
      <div>
        <>
          <Button onPress={onOpen} color="primary">
            Thêm {category?.name.toLowerCase()}
          </Button>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            size="3xl"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Thêm tài nguyên
                  </ModalHeader>
                  <ModalBody>
                    <form className="flex justify-between scrollbar scrollbar-thin overflow-y-auto">
                      <div className="w-full max-h-80">
                        <FormProvider {...methods}>
                          <AddResourceCommonForm isHiddenCategorySelect={true} isChemicalFieldVisible={isChemicalFieldVisible}/>
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
                      onClick={methods.handleSubmit(onSubmit)}
                    >
                      Thêm tài nguyên
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      </div>
    );
  };
  