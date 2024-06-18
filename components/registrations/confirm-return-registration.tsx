import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import { EditIcon } from "../icons/table/edit-icon";
import { ConfirmReturnRegistrationForm } from "../forms/registration-forms/confirm-return-registration-form";
import useSWR, { mutate } from "swr";
import { RegistrationDetail } from "./registration-table/data";
import { registrationFetcher } from "@/utils/fetchers/registration-fetchers/registration-fetcher";
import { LoaderSkeletonForm } from "../loader/loader-skeleton-form";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  ReturnResourceRegistrationchemaType,
  ReturnResourceRegistrationchema,
} from "./schema/return-resource-registration";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { RegistrationService } from "@/services/registrationService";
import { toast } from "react-toastify";
import axios from "axios";

export const ConfirmReturnRegistration = ({ registrationId }: { registrationId: number }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const methods = useForm<ReturnResourceRegistrationchemaType>({
    resolver: zodResolver(ReturnResourceRegistrationchema),
  });

  const { data: registration, isLoading: isFetchingRegistration } = useSWR<RegistrationDetail>(
    isOpen ? `/registration/${registrationId}` : null,
    registrationFetcher
  );

  useEffect(() => {
    if (!isFetchingRegistration && registration) {
      methods.reset({
        registrationId: registration.registration.id,
        uid: registration.registration.user.id,
        status: 1,
      });
    }
  }, [registration, isFetchingRegistration]);

  const onSubmit: SubmitHandler<ReturnResourceRegistrationchemaType> = async (payload) => {
    const resourceReturn = payload.itemRegistrationId;
    const remainQuantity = getRemainQuantity(resourceReturn);
    if (payload.quantity > remainQuantity) {
      methods.setError("quantity", { message: "Số lượng không hợp lệ" });
    }

    console.log(payload)

    try {
      const { data } = await RegistrationService.returnResource(payload);
      mutate((key) => Array.isArray(key) && key[0] === '/registration');
      mutate(`/registration/${registrationId}`);
      methods.reset();
      toast.success("Cập nhật thành công");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data.message);
      }
    }
  };

  const getRemainQuantity = (resourceId: number) => {
    const temp = registration?.items.find((item) => {
      return item.item.id === resourceId;
    });
    if (temp) {
      return temp.quantity - temp.quantityReturned;
    }
    return 0;
  };

  const handleCloseModal = () => {
    onClose();
    methods.clearErrors();
  };

  return (
    <>
      <Tooltip color="primary" content="Ghi nhận trả">
        <button onClick={onOpen}>
          <EditIcon size={20} fill="#979797" />
        </button>
      </Tooltip>
      <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Ghi nhận trả</ModalHeader>
              <ModalBody>
                {!isFetchingRegistration && registration ? (
                  <form className=" scrollbar scrollbar-thin overflow-y-auto">
                    <div className="w-full max-h-96">
                      <FormProvider {...methods}>
                        <ConfirmReturnRegistrationForm registrationDetail={registration} />
                      </FormProvider>
                    </div>
                  </form>
                ) : (
                  <LoaderSkeletonForm />
                )}
              </ModalBody>
              {isFetchingRegistration || (
                <ModalFooter>
                  <Button color="danger" variant="light" onClick={handleCloseModal}>
                    Đóng
                  </Button>
                  <Button color="primary" onClick={methods.handleSubmit(onSubmit)}>
                    Xác nhận
                  </Button>
                </ModalFooter>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
