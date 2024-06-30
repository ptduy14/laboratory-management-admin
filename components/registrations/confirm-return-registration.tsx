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
import { Registration, RegistrationDetail } from "./registration-table/data";
import { registrationFetcher } from "@/utils/fetchers/registration-fetchers/registration-fetcher";
import { LoaderSkeletonForm } from "../loader/loader-skeleton-form";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  ReturnRegistrationchemaType,
  ReturnRegistrationchema,
} from "./schema/return-resource-registration";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { RegistrationService } from "@/services/registrationService";
import { toast } from "react-toastify";
import axios from "axios";
import { ConfirmReturnIcon } from "../icons/table/confirm-return-icon";
import { fetchAllRegistrationResources } from "@/utils/fetchers/registration-fetchers/registration-resources-fetcher";
import { RegistrationStatus } from "@/enums/registration-status";

export const ConfirmReturnRegistration = ({ registration }: { registration: Registration }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const methods = useForm<ReturnRegistrationchemaType>({
    resolver: zodResolver(ReturnRegistrationchema),
  });

  const { data: registrationDetail, isLoading: isFetchingRegistrationDetail } =
    useSWR<RegistrationDetail>(
      isOpen ? `/registration/${registration.id}` : null,
      registrationFetcher
    );

  const { data: registrationResources, isLoading: isFetchingRegistrationResources } = useSWR(
    !isFetchingRegistrationDetail ? ["registrationResource", registrationDetail] : null,
    ([key, registrationDetail]) => fetchAllRegistrationResources(key, registrationDetail)
  );

  useEffect(() => {
    if (!isFetchingRegistrationResources && registrationResources && registrationDetail) {
      methods.reset({
        uid: registrationDetail.registration.user.id,
        status: 1,
        items: registrationResources.map((registrationResource, index) => ({
          registrationId: registrationDetail.registration.id,
          itemRegistrationId: registrationResource.item.id,
          quantity: registrationDetail.items[index].quantity,
          itemStatus: registrationResource.item.status,
        })),
      });
    }
  }, [isFetchingRegistrationResources]);

  const onSubmit: SubmitHandler<ReturnRegistrationchemaType> = async (payload) => {
    console.log(payload);
    try {
      const { data } = await RegistrationService.returnRegistrationResources(payload)
      mutate((key) => Array.isArray(key) && key[0] === '/registration')
      toast.success("Ghi nhận trả thành công");
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <>
      <Tooltip color="primary" content="Ghi nhận trả">
        <button onClick={onOpen}>
          <ConfirmReturnIcon />
        </button>
      </Tooltip>
      <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Ghi nhận trả</ModalHeader>
              <ModalBody>
                {!isFetchingRegistrationResources && registrationResources && registrationDetail ? (
                  <form className=" scrollbar scrollbar-thin overflow-y-auto">
                    <div className="w-full max-h-96">
                      <FormProvider {...methods}>
                        <ConfirmReturnRegistrationForm
                          registrationDetail={registrationDetail}
                          registrationResources={registrationResources}
                        />
                      </FormProvider>
                    </div>
                  </form>
                ) : (
                  <LoaderSkeletonForm />
                )}
              </ModalBody>
              {!isFetchingRegistrationResources && registrationResources && registrationDetail ? (
                <ModalFooter>
                  <Button color="danger" variant="light" onClick={handleCloseModal}>
                    Đóng
                  </Button>
                  <Button color="primary" onClick={methods.handleSubmit(onSubmit)}>
                    Xác nhận
                  </Button>
                </ModalFooter>
              ) : undefined}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
