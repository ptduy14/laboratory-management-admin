import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { TransferResourceForm } from "../forms/resource-forms/transfer-resource-form";
import useSWR from "swr";
import { Resource } from "./resource-table/data";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import {
  transferResourceSchema,
  transferResourceSchemaType,
} from "./schema/transferResourceSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { RoomResourceService } from "@/services/roomResourceService";
import { mutate } from "swr";
import { toast } from "react-toastify";
import type { UseDisclosureReturn } from "@nextui-org/use-disclosure";
import { roomsFetcher } from "@/utils/fetchers/room-fetchers.ts/rooms-fetcher";
import { useState } from "react";

export const TransferResource = ({
  resource,
  disclosure,
}: {
  resource: Resource;
  disclosure: UseDisclosureReturn;
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = disclosure;
  const [isLoading, setIsloading] = useState<boolean>(false)

  const methods = useForm<transferResourceSchemaType>({
    resolver: zodResolver(transferResourceSchema),
    defaultValues: {
      itemId: resource.id,
      status: 0,
    },
  });

  const { data: rooms, isLoading: isFetchingRooms } = useSWR(
    isOpen ? ["/rooms", { take: 50 }] : null,
    ([url, queryParams]) => roomsFetcher(url, queryParams)
  );

  const onSubmit: SubmitHandler<transferResourceSchemaType> = async (data) => {
    if (data.quantity > resource.quantity - resource.handover) {
      methods.setError("quantity", {
        type: "invalid",
        message: "Số lượng bàn giao không hợp lệ",
      });
      return;
    }

    setIsloading(true);

    try {
      const { data: res } = await RoomResourceService.transferResource(data);
      //udpate cache and trigger revalidation
      mutate((key) => Array.isArray(key) && key[0] === "/items");
      mutate(
        (key) => Array.isArray(key) && key[0].startsWith(`/items/category/`)
      );
      methods.reset();
      toast.success("Bàn giao thành công");
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    } finally {
      setIsloading(false);
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
                Bàn giao{" "}
                {`${resource.name.toLowerCase()} ${resource.specification}`}
              </ModalHeader>
              <ModalBody>
                <div className="p-4 bg-[#3F3F46] rounded mb-4">
                  <span className="font-bold">Số lượng hiện có sẵng:</span>{" "}
                  {resource.quantity - resource.handover}
                </div>
                <form className="flex justify-between scrollbar scrollbar-thin overflow-y-auto">
                  <div className="w-full max-h-80">
                    <FormProvider {...methods}>
                      <TransferResourceForm rooms={rooms.data} />
                    </FormProvider>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onClick={handleCloseModal}
                >
                  Đóng
                </Button>
                <Button
                  color="primary"
                  isLoading={isLoading}
                  onClick={methods.handleSubmit(onSubmit)}
                >
                  Bàn giao
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
