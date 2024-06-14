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
import { useForm, SubmitHandler } from "react-hook-form";
import { UpdateAccountSchema, UpdateAccountSchemaType } from "./schema/updateAccountSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { UserService } from "@/services/userService";
import { LoaderImageText } from "../loader/loader-image-text";
import { RoleEnum, RoleNames } from "@/enums/role";
import { ACCEPTED_IMAGE_TYPES } from "./schema/updateAccountSchema";
import { CloudinaryService } from "@/services/cloudinaryService";
import axios from "axios";
import { toast } from "react-toastify";
import { AccountStatus, AccountStatusNames } from "@/enums/account-status";
import { Account } from "./account-table/data";
import { getPublicIdFromUrl } from "@/utils/getPublicIdFromUrl";
import useSWR, { mutate } from "swr";

export default function UpdateAccount({ accountId }: { accountId: number }) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [currentAccountPhoto, setCurrentAccountPhoto] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    clearErrors,
  } = useForm<UpdateAccountSchemaType>({
    resolver: zodResolver(UpdateAccountSchema),
  });

  const { data } = useSWR<Account>(
    isOpen ? `/users/get/${accountId.toString()}` : null,
    async (url: string) => {
      const { data } = await UserService.getById(url);
      setCurrentAccountPhoto(data.photo);
      reset({ ...data });
      setIsLoading(false);
      return data;
    }
  );

  // const getAccountById = async () => {
  //   const { data } = await UserService.getById(accountId.toString());
  //   let account = {
  //     ...data,
  //   };
  //   console.log(acc)
  //   setCurrentAccountPhoto(data.photo);
  //   reset({ ...account });
  //   setIsLoading(false);
  // };

  const handleDeleteImgFromCloud = async () => {
    if (setCurrentAccountPhoto !== undefined) {
      let publicId = getPublicIdFromUrl(currentAccountPhoto);
      try {
        const res = await CloudinaryService.deleteImg(publicId!);
        console.log(res);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
        }
      }
    }
    return;
  };

  const onSubmit: SubmitHandler<UpdateAccountSchemaType> = async (data) => {
    let account: Account;
    try {
      if (!Array.isArray(data.photo)) {
        const { data: upadtedAccount } = await UserService.updateById(accountId.toString(), {
          ...data,
          photo: currentAccountPhoto ? currentAccountPhoto : "",
        });
        account = upadtedAccount;
      } else {
        const { data: cloudinaryData } = await CloudinaryService.uploadImg(data.photo[0]);
        let newData = {
          ...data,
          photo: cloudinaryData.url,
        };
        handleDeleteImgFromCloud();
        const { data: updatedAccount } = await UserService.updateById(
          accountId.toString(),
          newData
        );
        account = updatedAccount;
      }
      toast.success("Cập nhật thành công !!");

      // cần cập nhật lại data ở đây
      mutate((key) => typeof key === "string" && key.startsWith("/users/get?page="));
      // cập nhật lại cache của detail account id
      mutate(`/users/get/${accountId.toString()}`);

      reset({ ...account });
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  const handlePreviewImage = (e: any) => {
    if (!ACCEPTED_IMAGE_TYPES.includes(e.target.files[0].type)) {
      setPreviewImage(null);
      return;
    }

    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleCloseModal = () => {
    onClose();
    clearErrors();
    setPreviewImage(null);
  };

  return (
    <>
      <div>
        <Tooltip content="Update account" color="secondary">
          <button onClick={onOpen}>
            <EditIcon size={20} fill="#979797" />
          </button>
        </Tooltip>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Account Update</ModalHeader>
              <ModalBody>
                {isLoading ? (
                  <LoaderImageText />
                ) : (
                  <form className="flex justify-between scrollbar scrollbar-thin overflow-y-auto">
                    <div className="w-1/3 pr-5">
                      <Avatar
                        className="w-full h-48"
                        radius="sm"
                        src={previewImage ? previewImage : currentAccountPhoto || ""}
                      />
                      <div className="mt-3">
                        <label
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          htmlFor="small_size">
                          Avata
                        </label>
                        <input
                          className="block w-full mb-2 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                          id="small_size"
                          type="file"
                          {...register("photo")}
                          onChange={handlePreviewImage}></input>
                        {errors.photo?.message ? (
                          <span className="text-xs text-danger">
                            {errors?.photo?.message.toString()}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="w-2/3 max-h-80">
                      <Input
                        className="mb-7"
                        label="First Name"
                        placeholder="Enter your first name"
                        variant="bordered"
                        errorMessage={errors.firstName?.message}
                        isInvalid={errors.firstName?.message ? true : false}
                        defaultValue={getValues("firstName")}
                        {...register("firstName")}
                      />
                      <Input
                        className="mb-7"
                        label="Last Name"
                        variant="bordered"
                        errorMessage={errors.lastName?.message}
                        isInvalid={errors.lastName?.message ? true : false}
                        defaultValue={getValues("lastName")}
                        {...register("lastName")}
                      />
                      <Input
                        className="mb-7"
                        label="address"
                        variant="bordered"
                        errorMessage={errors.address?.message}
                        isInvalid={errors.address?.message ? true : false}
                        defaultValue={getValues("address")}
                        {...register("address")}
                      />
                      <div className="mb-7">
                        <label
                          htmlFor="status"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Select status
                        </label>
                        <select
                          id="status"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          defaultValue={getValues("status")}
                          {...register("status")}
                          onChange={(e) => console.log(typeof e.target.value)}>
                          <option value={AccountStatus.ACTIVE}>
                            {AccountStatusNames[AccountStatus.ACTIVE]}
                          </option>
                          <option value={AccountStatus.INACTIVE}>
                            {AccountStatusNames[AccountStatus.INACTIVE]}
                          </option>
                        </select>
                      </div>
                      <div className="mb-7">
                        <label
                          htmlFor="roles"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Select an role
                        </label>
                        <select
                          id="roles"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          defaultValue={getValues("role")}
                          {...register("role")}
                          onChange={(e) => console.log(typeof e.target.value)}>
                          <option value={RoleEnum.ADMIN}>{RoleNames[RoleEnum.ADMIN]}</option>
                          <option value={RoleEnum.MANAGER}>{RoleNames[RoleEnum.MANAGER]}</option>
                          <option value={RoleEnum.USER}>{RoleNames[RoleEnum.USER]}</option>
                        </select>
                      </div>
                    </div>
                  </form>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button color="primary" variant="flat" onClick={handleSubmit(onSubmit)}>
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
