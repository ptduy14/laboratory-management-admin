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

export default function UpdateResouce({ resourceId }: { resourceId: number }) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [schema, setSchema] = useState<z.ZodType<UpdateResourceSchemaUnionType>>(
    UpdateResourceCommonSchema
  );
  const { mutate } = useSWRConfig();

  const methods = useForm<UpdateResourceSchemaUnionType>({
    resolver: zodResolver(schema),
  });

  const { data: resource, isLoading: isFetchingResource } = useSWR<Resource>(
    isOpen ? `/items/${resourceId.toString()}` : null,
    async (url: string) => {
      const { data } = await ResourceService.getById(url);
      methods.reset({ ...data, categoryId: data.category.id });
      return data;
    }
  );

  const { data: categories } = useSWR("/categories", async (url) => {
    const { data } = await CategoryService.getAll(url);
    return data;
  });

  let categoryIdSelected: number = methods.watch("categoryId");

  // need to improment later
  useEffect(() => {
    let newSchema = getUpdateResourceSchema(categoryIdSelected);
    setSchema(newSchema);
    methods.reset(undefined, { keepValues: true }); // Reset form with new schema
  }, [categoryIdSelected, categories]);

  const getUpdateResourceSchema = (id: number) => {
    let category = categories?.data.find((category: Category) => {
      return category.id === id;
    });
    switch (category?.name) {
      case "Hóa chất":
        console.log("ok");
        return UpdateResourceChemicalSchema;
      default:
        return UpdateResourceCommonSchema;
    }
  };

  const onSubmit: SubmitHandler<UpdateResourceSchemaUnionType> = async (data) => {
    try {
      const { data: resourceUpdated } = await ResourceService.update(resourceId, data);
      mutate((key) => typeof key === "string" && key.startsWith(`/items?page=`));
      mutate(`/items/${resourceId.toString()}`);
      mutate((key) => typeof key === "string" && key.startsWith(`/items/category/`));
      methods.reset();
      toast.success("Cập nhật thành công");
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  const handleCloseModal = () => {
    onClose();
    methods.clearErrors();
  };

  return (
    <>
      <div>
        <Tooltip content="cập nhật tài nguyên" color="secondary">
          <button onClick={onOpen}>
            <EditIcon size={20} fill="#979797" />
          </button>
        </Tooltip>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Cập nhật tài nguyên</ModalHeader>
              <ModalBody>
                {isFetchingResource ? (
                  <LoaderSkeletonForm />
                ) : (
                  <form className="flex justify-between scrollbar scrollbar-thin overflow-y-auto">
                    <div className="w-full max-h-80">
                      <FormProvider {...methods}>
                        <UpdateResourceCommonForm categories={categories?.data} />
                      </FormProvider>
                    </div>
                  </form>
                )}
              </ModalBody>
              {isFetchingResource || (
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={handleCloseModal}>
                    Close
                  </Button>
                  <Button color="primary" variant="flat" onClick={methods.handleSubmit(onSubmit)}>
                    Update
                  </Button>
                </ModalFooter>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
