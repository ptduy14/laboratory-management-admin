import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import useSWR from "swr";
import { RoomService } from "@/services/roomService";
import { ResourcesTransfered } from "./room-resources-table/data";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import {
  transferResourceSchema,
  transferResourceSchemaType,
} from "../resoures/schema/transferResourceSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { RoomResourceService } from "@/services/roomResourceService";
import { mutate } from "swr";
import { toast } from "react-toastify";
import type { UseDisclosureReturn } from "@nextui-org/use-disclosure";
import { ReTransferResourceForm } from "../forms/resource-forms/retransfer-resource-form";

export const ReTransferResource = ({
  resourceTransfered,
  disclosure,
}: {
  resourceTransfered: ResourcesTransfered;
  disclosure: UseDisclosureReturn;
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = disclosure;

  const methods = useForm<transferResourceSchemaType>({
    resolver: zodResolver(transferResourceSchema),
    defaultValues: {
      itemId: resourceTransfered.item.id,
      status: 0,
      year: resourceTransfered.year,
    },
  });

  const { data: rooms, isLoading: isFetchingRooms } = useSWR(
    isOpen ? "/rooms" : null,
    async (url) => {
      const { data } = await RoomService.getAll(url);
      return data;
    }
  );

  const onSubmit: SubmitHandler<transferResourceSchemaType> = async (data) => {
    if ((data.quantity > resourceTransfered.quantity - resourceTransfered.itemQuantityBorrowed)) {
      methods.setError("quantity", {
        type: "invalid",
        message: "Số lượng chuyển tiếp không hợp lệ",
      });
      return;
    }   
    console.log(data)

    try {
      const { data: res } = await RoomResourceService.reTransferResource(resourceTransfered.id.toString(), data);
      //udpate cache and trigger revalidation
      mutate((key) => typeof key === "string" && key.startsWith("/room-items/room/"));
      methods.reset();
      toast.success("Chuyển tiếp thành công");
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const handleCloseModal = () => {
    onClose();
    methods.clearErrors();
  };

  return (
    <>
      <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Chuyển tiếp {`${resourceTransfered.item.name.toLowerCase()} ${resourceTransfered.item.specification}`}
              </ModalHeader>
              <ModalBody>
                <div className="p-4 bg-[#3F3F46] rounded mb-4">
                  <span className="font-bold">Số lượng hiện có sẵng:</span> {resourceTransfered.quantity}
                </div>
                <form className="flex justify-between scrollbar scrollbar-thin overflow-y-auto">
                  <div className="w-full max-h-80">
                    <FormProvider {...methods}>
                      <ReTransferResourceForm currentRoom={resourceTransfered.room.id} rooms={rooms.data} />
                    </FormProvider>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={handleCloseModal}>
                  Đóng
                </Button>
                <Button color="primary" onClick={methods.handleSubmit(onSubmit)}>
                  Chuyển tiếp
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
