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
import { AccountService } from "@/services/accountService";
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

  const methods = useForm<UpdateAccountSchemaType>({
    resolver: zodResolver(UpdateAccountSchema),
  });

  useEffect(() => {
    methods.reset({ ...account });
  }, [account]);

  const handleDeleteImgFromCloud = async () => {
    let publicId = getPublicIdFromUrl(account.photo ? account.photo : "");
    if (!publicId) return;

    const res = await CloudinaryService.deleteImg(publicId);
    console.log(res);
  };

  const onSubmit: SubmitHandler<UpdateAccountSchemaType> = async (data) => {
    setIsLoading(true);
    try {
      if (data.photo) {
        handleDeleteImgFromCloud();
        const { data: cloudinaryData } = await CloudinaryService.uploadImg(
          data.photo[0]
        );
        console.log(cloudinaryData);
        let newData = {
          ...data,
          photo: cloudinaryData.url,
        };
        await AccountService.updateById(accountId.toString(), newData);
      } else {
        await AccountService.updateById(accountId.toString(), {
          ...data,
          photo: account.photo ? account.photo : "",
        });
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
                      currentAccountPhoto={account.photo}
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
