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
import axios from "axios";
import { UnitEnum, UnitEnumNames } from "@/enums/unit";
import { ResourceStatus, ResourceStatusName } from "@/enums/resource-status";
import { CategoryService } from "@/services/categoryService";
import useSWR from "swr";
import {
  AddResourceChemicalSchema,
  AddResourceEquipmentSchema,
  AddResourceToolSchema,
  AddResourceSchemaUnion,
} from "./schema/addResourceSchema";
import { AddResourceCommonForm } from "../forms/resource-forms/add-resource-common-form";
import { Category } from "../category/category-table/data";
import { AddResourceToolField } from "../forms/resource-forms/add-resource-tool-field";
import { AddResourceChemicalField } from "../forms/resource-forms/add-resource-chemical-field";
import { AddResourceEquipmentField } from "../forms/resource-forms/add-resource-equipment-field";
import { z } from "zod";

export const AddResource = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [schema, setSchema] = useState<z.ZodType<AddResourceSchemaUnion>>(AddResourceEquipmentSchema);

  const methods = useForm<AddResourceSchemaUnion>({
    resolver: zodResolver(schema),
  });

  const categoryId: number = methods.watch("categoryId", 1);

  const { data: categories } = useSWR("/categories", async (url) => {
    const { data } = await CategoryService.getAll(url);
    return data;
  });

  useEffect(() => {
    let newSchema = getAddResourceSchema(categoryId);
    setSchema(newSchema);
    methods.reset(undefined, { keepValues: true }); // Reset form with new schema
  }, [categoryId, categories]);

  const getAddResourceSchema = (categoryId: number) => {
    let category = categories?.data.find((category: Category) => {
      return category.id === categoryId;
    })
    console.log(category?.name)
    switch (category?.name) {
      case "Thiết bị":
        return AddResourceEquipmentSchema;
      case "Dụng cụ":
        return AddResourceToolSchema;
      default:
        console.log('ok')
        return AddResourceChemicalSchema;
    }
  };

  // consider to use useMemo to memorize this result
  const RenderAdditionField = (categoryId: number) => {
    switch (Number(categoryId)) {
      case 1:
        return <AddResourceEquipmentField />;
      case 2:
        return <AddResourceToolField />;
      default:
        return <AddResourceChemicalField/>
    }
  };

  const onSubmit: SubmitHandler<AddResourceSchemaUnion> = (data) => {
    console.log(data);
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <div>
      <>
        <Button onPress={onOpen} color="primary">
          Thêm tài nguyên
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
                        <AddResourceCommonForm categories={categories?.data} />
                        {categoryId && RenderAdditionField(categoryId)}
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
