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
import { StatusResource, StatusResourceName } from "@/enums/resource-status";
import { Category } from "../category/category-table/data";
import { CategoryService } from "@/services/categoryService";
import useSWR from "swr";

export const AddResource = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  // const [categories, setCategories] = useState<Category[]>([]);

  const { data: categories } = useSWR("/categories", async (url) => {
    const { data } = await CategoryService.getAll(url);
    return data;
  });

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <div>
      <>
        <Button onPress={onOpen} color="primary">
          Add Resource
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
                  Add Resource
                </ModalHeader>
                <ModalBody>
                  <form className="flex justify-between scrollbar scrollbar-thin overflow-y-auto">
                    <div className="w-full max-h-80">
                      <Input className="mb-7" label="Tên" variant="bordered" />
                      <Input
                        className="mb-7"
                        label="Xuất xứ"
                        variant="bordered"
                      />
                      <Input
                        className="mb-7"
                        label="Số seri"
                        variant="bordered"
                      />
                      <Input
                        className="mb-7"
                        label="Dung tích"
                        variant="bordered"
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
                          defaultValue={StatusResource.NORMAL_OPERATION}
                          id="status"
                          className="mb-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value={StatusResource.NORMAL_OPERATION}>
                            {
                              StatusResourceName[
                                StatusResource.NORMAL_OPERATION
                              ]
                            }
                          </option>
                        </select>
                      </div>
                      <Input
                        className="mb-7"
                        label="Số lượng"
                        variant="bordered"
                      />
                      <Input
                        className="mb-7"
                        label="Chú thích"
                        variant="bordered"
                      />
                      <div className="mb-7">
                        <label
                          htmlFor="category"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Danh mục
                        </label>
                        <select
                          defaultValue="admin"
                          id="category"
                          className="mb-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          {categories?.data.map((category: any) => {
                            if (category.status !== 0) return
                            return (
                                <option key={category.id} value={category.id}>{category.name}</option>
                              )
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
                    Close
                  </Button>
                  <Button color="primary">Add Resource</Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
