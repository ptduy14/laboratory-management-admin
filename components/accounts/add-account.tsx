import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Avatar,
} from "@nextui-org/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeFilledIcon } from "../icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../icons/EyeSlashFilledIcon";

const AddAccountSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Trường này không được trống" })
      .regex(/^[a-zA-Z0-9._%+-]+@student\.ctuet\.edu\.vn$/, {
        message: "Địa chỉ email không hợp lệ",
      }),
    firstName: z.string().min(1, { message: "Trường này không được trống" }),
    lastName: z.string().min(1, { message: "Trường này không được trống" }),
    address: z.string(),
    password: z
      .string()
      .min(8, { message: "Mật khẩu phải lớn hơn 8 ký tự" })
      .max(32)
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$/, {
        message: "Mật khẩu phải chứa ít nhất một chữ cái và một số",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Trường này không được trống" }),
    role: z.string().min(1, { message: "Trường này không được trống" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

type AddAccountSchemaType = z.infer<typeof AddAccountSchema>;

export const AddAccount = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isVisible, setIsVisible] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<AddAccountSchemaType>({
    resolver: zodResolver(AddAccountSchema),
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit: SubmitHandler<AddAccountSchemaType> = (data) => {
    console.log(data);
  };

  const handleCloseModal = () => {
    clearErrors();
    onClose();
  };

  return (
    <div>
      <>
        <Button onPress={onOpen} color="primary">
          Add Account
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
                        Select an option
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
                  <Button color="primary" onClick={handleSubmit(onSubmit)}>
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
