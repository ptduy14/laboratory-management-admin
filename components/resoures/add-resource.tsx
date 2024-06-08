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
import { SubmitHandler, useForm } from "react-hook-form";
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
  AddResourceSchema,
  AddResourceSchemaType,
} from "./schema/addResourceSchema";

export const AddResource = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<AddResourceSchemaType>({
    resolver: zodResolver(AddResourceSchema),
  });

  const { data: categories } = useSWR("/categories", async (url) => {
    const { data } = await CategoryService.getAll(url);
    return data;
  });

  const onSubmit: SubmitHandler<AddResourceSchemaType> = (data) => {
    console.log(data)
  }

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
                      <Input
                        className="mb-7"
                        label="Tên"
                        variant="bordered"
                        errorMessage={errors.name?.message}
                        isInvalid={
                          errors.name?.message ? true : false
                        }
                        {...register("name")}
                      />
                      <Input
                        className="mb-7"
                        label="Xuất xứ"
                        variant="bordered"
                        errorMessage={errors.origin?.message}
                        isInvalid={errors.origin?.message ? true : false}
                        {...register("origin")}
                      />
                      <Input
                        className="mb-7"
                        label="Số seri"
                        variant="bordered"
                        errorMessage={errors.serial_number?.message}
                        isInvalid={
                          errors.serial_number?.message ? true : false
                        }
                        {...register("serial_number")}
                      />
                      <Input
                        className="mb-7"
                        label="Dung tích"
                        variant="bordered"
                        errorMessage={errors.specification?.message}
                        isInvalid={
                          errors.specification?.message ? true : false
                        }
                        {...register("specification")}
                      />
                      <div className="mb-7">
                        <label
                          htmlFor="units"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Đơn vị tính
                        </label>
                        <select
                          defaultValue={UnitEnum.BOTTLE}
                          id="units"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          {...register("unit")}
                        >
                          <option value={UnitEnum.BOTTLE}>
                            {UnitEnumNames[UnitEnum.BOTTLE]}
                          </option>
                          <option value={UnitEnum.PEACE}>
                            {UnitEnumNames[UnitEnum.PEACE]}
                          </option>
                          <option value={UnitEnum.SET}>
                            {UnitEnumNames[UnitEnum.SET]}
                          </option>
                          <option value={UnitEnum.BOX}>
                            {UnitEnumNames[UnitEnum.BOX]}
                          </option>
                          <option value={UnitEnum.BAG}>
                            {UnitEnumNames[UnitEnum.BAG]}
                          </option>
                          <option value={UnitEnum.PACK}>
                            {UnitEnumNames[UnitEnum.PACK]}
                          </option>
                          <option value={UnitEnum.SACHET}>
                            {UnitEnumNames[UnitEnum.SACHET]}
                          </option>
                        </select>
                      </div>

                      <div className="mb-7">
                        <label
                          htmlFor="status"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Trạng thái
                        </label>
                        <select
                          defaultValue={ResourceStatus.NORMAL_OPERATION}
                          id="status"
                          className="mb-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          {...register("status")}
                        >
                          <option value={ResourceStatus.NORMAL_OPERATION}>
                            {
                              ResourceStatusName[
                                ResourceStatus.NORMAL_OPERATION
                              ]
                            }
                          </option>
                          <option value={ResourceStatus.STILL_IN_GOOD_USE}>
                            {
                              ResourceStatusName[
                                ResourceStatus.STILL_IN_GOOD_USE
                              ]
                            }
                          </option>
                          <option value={ResourceStatus.AWAITING_REPAIR}>
                            {ResourceStatusName[ResourceStatus.AWAITING_REPAIR]}
                          </option>
                          <option value={ResourceStatus.MALFUNCTIONING}>
                            {ResourceStatusName[ResourceStatus.MALFUNCTIONING]}
                          </option>
                        </select>
                      </div>
                      <Input
                        className="mb-7"
                        label="Số lượng"
                        variant="bordered"
                        errorMessage={errors.quantity?.message}
                        isInvalid={
                          errors.quantity?.message ? true : false
                        }
                        {...register("quantity")}
                      />
                      <Input
                        className="mb-7"
                        label="Chú thích"
                        variant="bordered"
                        errorMessage={errors.remark?.message}
                        isInvalid={
                          errors.remark?.message ? true : false
                        }
                        {...register("remark")}
                      />
                      <div className="mb-7">
                        <label
                          htmlFor="category"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Danh mục
                        </label>
                        <select
                          defaultValue={categories?.data[0]}
                          id="category"
                          className="mb-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          {...register("categoryId")}
                        >
                          {categories?.data.map((category: any) => {
                            if (category.status !== 0) return;
                            return (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
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
                  <Button color="primary" onClick={handleSubmit(onSubmit)}>Thêm tài nguyên</Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
