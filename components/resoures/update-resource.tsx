import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tooltip,
  Button,
  Input,
  Avatar,
} from "@nextui-org/react";
import { EditIcon } from "@/components/icons/table/edit-icon";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { ResourceService } from "@/services/resourceService";
import { LoaderImageText } from "../loader/loader-image-text";
import { RoleEnum, RoleNames } from "@/enums/role";
import { CloudinaryService } from "@/services/cloudinaryService";
import axios from "axios";
import { toast } from "react-toastify";
import { AccountStatus, AccountStatusNames } from "@/enums/account-status";
import { getPublicIdFromUrl } from "@/utils/getPublicIdFromUrl";
import useSWR, { mutate } from "swr";
import { Resource } from "./resource-table/data";
import {
  UpdateResourceCommonSchema,
  UpdateResourceChemicalSchema,
  UpdateResourceSchemaUnionType,
} from "./schema/updateResourceSchema";
import { z } from "zod";
import { UpdateResourceCommonForm } from "../forms/resource-forms/update-resource-common-form";
import { CategoryService } from "@/services/categoryService";
import { Category } from "../category/category-table/data";
import { useSWRConfig } from "swr";
import { LoaderSkeletonForm } from "../loader/loader-skeleton-form";
import type { UseDisclosureReturn } from "@nextui-org/use-disclosure";
import { resourceFetcher } from "@/utils/fetchers/resource-fetchers.ts/resource-fetcher";
import { categoriesFetcher } from "@/utils/fetchers/category-fetchers.ts/categories-fetcher";

export default function UpdateResouce({
  resourceId,
  resource,
  disclosure,
}: {
  resourceId: number;
  resource: Resource;
  disclosure: UseDisclosureReturn;
}) {
  const { isOpen, onOpen, onClose, onOpenChange } = disclosure;
  const [isChemicalFieldVisible, setIsChemicalFieldVisible] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [schema, setSchema] = useState<z.ZodType<UpdateResourceSchemaUnionType>>(UpdateResourceCommonSchema);
  const { mutate } = useSWRConfig();

  const methods = useForm<UpdateResourceSchemaUnionType>({
    resolver: zodResolver(schema),
  });

  const { data: categories } = useSWR(
    ["/categories", {}],
    ([url, queryParams]) => categoriesFetcher(url, queryParams)
  );

  useEffect(() => {
    if (!resource) return;
    methods.reset({
      ...resource,
      categoryId: resource.category.id,
      volume: resource.volume ?? undefined,
      serial_number: resource.serial_number ?? undefined,
      remark: resource.remark ?? undefined,
    });
  }, [resource]);

  let categoryIdSelected: number = methods.watch("categoryId");

  // need to improment later
  useEffect(() => {
    let newSchema = getUpdateResourceSchema(categoryIdSelected);
    setSchema(newSchema);
    methods.reset(undefined, { keepValues: true }); // Reset form with new schema
  }, [categoryIdSelected]);

  const getUpdateResourceSchema = (categoryIdSelected: number) => {
    let category = categories?.data.find((category: Category) => {
      return category.id === categoryIdSelected;
    });
    switch (category?.name) {
      case "Hóa chất":
        setIsChemicalFieldVisible(false)
        return UpdateResourceChemicalSchema;
      default:
        setIsChemicalFieldVisible(true)
        return UpdateResourceCommonSchema;
    }
  };

  const onSubmit: SubmitHandler<UpdateResourceSchemaUnionType> = async (data) => {
    setIsLoading(true)
    try {
      const { data: resourceUpdated } = await ResourceService.update(
        resourceId,
        data
      );
      console.log(resourceUpdated);
      methods.reset();
      mutate((key) => Array.isArray(key) && key[0] === "/items");
      mutate((key) => Array.isArray(key) && key[0] === `/items/category/${resourceUpdated.category.id}`);
      methods.reset();
      toast.success("Cập nhật thành công");
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    } finally {
      setIsLoading(false)
    }
  };

  const handleCloseModal = () => {
    onClose();
    methods.clearErrors();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="3xl"
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Cập nhật tài nguyên
              </ModalHeader>
              <ModalBody>
                <form className="flex justify-between scrollbar scrollbar-thin overflow-y-auto">
                  <div className="w-full max-h-80">
                    <FormProvider {...methods}>
                      <UpdateResourceCommonForm isChemicalFieldVisible={isChemicalFieldVisible} categories={categories?.data} />
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
                  isLoading={isLoading}
                  onClick={methods.handleSubmit(onSubmit)}
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
}
