import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tooltip,
  Button,
} from "@nextui-org/react";
import { EditIcon } from "@/components/icons/table/edit-icon";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import {
  UpdateAccountSchema,
  UpdateAccountSchemaType,
} from "./schema/updateAccountSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { UserService } from "@/services/userService";
import { ACCEPTED_IMAGE_TYPES } from "./schema/updateAccountSchema";
import { CloudinaryService } from "@/services/cloudinaryService";
import axios from "axios";
import { toast } from "react-toastify";
import { Account } from "./account-table/data";
import { getPublicIdFromUrl } from "@/utils/getPublicIdFromUrl";
import { mutate } from "swr";
import { UpdateAccountForm } from "../forms/account-forms/update-account-form";

export default function UpdateAccount({
  accountId,
  account,
}: {
  accountId: number;
  account: Account;
}) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [currentAccountPhoto, setCurrentAccountPhoto] = useState<string>("");

  const methods = useForm<UpdateAccountSchemaType>({
    resolver: zodResolver(UpdateAccountSchema),
  });

  // {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  //   getValues,
  //   clearErrors,
  // }

  useEffect(() => {
    setCurrentAccountPhoto(account.photo ? account.photo : "");
    methods.reset({ ...account });
  }, [account]);

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
    setIsLoading(true);
    let account: Account;
    try {
      if (!Array.isArray(data.photo)) {
        const { data: upadtedAccount } = await UserService.updateById(
          accountId.toString(),
          {
            ...data,
            photo: currentAccountPhoto ? currentAccountPhoto : "",
          }
        );
        account = upadtedAccount;
      } else {
        const { data: cloudinaryData } = await CloudinaryService.uploadImg(
          data.photo[0]
        );
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
      mutate((key) => Array.isArray(key) && key[0] === "/users/get");

      // close model after successfully updated
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
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
    methods.clearErrors();
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
                Account Update
              </ModalHeader>
              <ModalBody>
                <form className="flex justify-between scrollbar scrollbar-thin overflow-y-auto">
                  <FormProvider {...methods}>
                    <UpdateAccountForm
                      previewImage={previewImage}
                      currentAccountPhoto={currentAccountPhoto}
                      handlePreviewImage={handlePreviewImage}
                    ></UpdateAccountForm>
                  </FormProvider>
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
                <Button
                  color="primary"
                  variant="flat"
                  onClick={methods.handleSubmit(onSubmit)}
                  isLoading={isLoading}
                >
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
