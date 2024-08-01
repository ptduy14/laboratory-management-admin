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
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeFilledIcon } from "../icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../icons/EyeSlashFilledIcon";
import { AccountService } from "@/services/accountService";
import { Account } from "./account-table/data";
import { AddAccountSchema } from "./schema/addAccountSchema";
import { AddAccountSchemaType } from "./schema/addAccountSchema";
import { toast } from "react-toastify";
import axios from "axios";
import { AccountStatus } from "@/enums/account-status";
import { translateErrorMessage } from "@/utils/translateErrorMessage";

type AddAccountProps = {
  mutate: any
}

export const AddAccount = ({ mutate } : AddAccountProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset
  } = useForm<AddAccountSchemaType>({
    resolver: zodResolver(AddAccountSchema),
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit: SubmitHandler<AddAccountSchemaType> = async (dataField) => {
    setIsLoading(true)
    dataField = {...dataField, status: AccountStatus.ACTIVE}
    try {
      const { data } = await AccountService.createAccount(dataField)
      console.log(data);
      mutate();
      toast.success("Thêm tài khoản thành công !!")
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(translateErrorMessage(error.response?.data.message))
      } else {
        toast.error('Đã có lỗi xảy ra. Vui lòng liên hệ Admin')
      }
    } finally {
      setIsLoading(false)
    }
  };

  const handleCloseModal = () => {
    clearErrors();
    onClose();
    reset();
  };

  return (
    <div>
      <>
        <Button onPress={onOpen} color="primary">
          Thêm Account
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
                  Add Account
                </ModalHeader>
                <ModalBody>
                  <form className="flex justify-between scrollbar scrollbar-thin overflow-y-auto">
                    <div className="w-full max-h-80">
                      <Input
                        className="mb-7"
                        label="Email"
                        variant="bordered"
                        errorMessage={errors.email?.message}
                        isInvalid={errors.email?.message ? true : false}
                        {...register("email")}
                      />
                      <Input
                        className="mb-7"
                        label="First Name"
                        variant="bordered"
                        errorMessage={errors.firstName?.message}
                        isInvalid={errors.firstName?.message ? true : false}
                        {...register("firstName")}
                      />
                      <Input
                        className="mb-7"
                        label="Last Name"
                        variant="bordered"
                        errorMessage={errors.lastName?.message}
                        isInvalid={errors.lastName?.message ? true : false}
                        {...register("lastName")}
                      />
                      <Input
                        className="mb-7"
                        label="address"
                        variant="bordered"
                        errorMessage={errors.address?.message}
                        isInvalid={errors.address?.message ? true : false}
                        {...register("address")}
                      />

                      <Input
                        className="mb-7"
                        label="Password"
                        variant="bordered"
                        errorMessage={errors.password?.message}
                        isInvalid={errors.password?.message ? true : false}
                        endContent={
                          <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                          </button>
                        }
                        type={isVisible ? "text" : "password"}
                        {...register("password")}
                      />
                      <Input
                        className="mb-7"
                        label="Confirm Password"
                        variant="bordered"
                        errorMessage={errors.confirmPassword?.message}
                        isInvalid={
                          errors.confirmPassword?.message ? true : false
                        }
                        endContent={
                          <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                          </button>
                        }
                        type={isVisible ? "text" : "password"}
                        {...register("confirmPassword")}
                      />
                      <label
                        htmlFor="roles"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Select role
                      </label>
                      <select
                        defaultValue="admin"
                        id="roles"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        {...register("role")}
                      >
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                      </select>
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
                  <Button color="primary" onClick={handleSubmit(onSubmit)} isLoading={isLoading}>
                    Add Account
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
