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
  ReturnResourceRegistrationchemaType,
  ReturnResourceRegistrationchema,
} from "./schema/return-resource-registration";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { RegistrationService } from "@/services/registrationService";
import { toast } from "react-toastify";
import axios from "axios";
import { ConfirmReturnIcon } from "../icons/table/confirm-return-icon";

export const ConfirmReturnRegistration = ({ registration }: { registration: Registration }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <>
      <Tooltip color="primary" content="Ghi nhận trả">
        <button onClick={onOpen}>
          <ConfirmReturnIcon/>
        </button>
      </Tooltip>
      <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Ghi nhận trả</ModalHeader>
              <ModalBody>
          
                  <form className=" scrollbar scrollbar-thin overflow-y-auto">
                    <div className="w-full max-h-96">
                      {/* <FormProvider>
                        <ConfirmReturnRegistrationForm registrationDetail={registration} />
                      </FormProvider> */}
                    </div>
                  </form>
              </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onClick={handleCloseModal}>
                    Đóng
                  </Button>
                  <Button color="primary" onClick={() => console.log()}>
                    Xác nhận
                  </Button>
                </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
