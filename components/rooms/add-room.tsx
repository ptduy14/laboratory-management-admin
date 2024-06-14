import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { AddRoomSchema, AddRoomSchemaType } from "./schema/addRoomSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddRoomForm } from "../forms/room-forms/add-room-form";
import axios from "axios";
import { RoomService } from "@/services/roomService";
import { toast } from "react-toastify";

export const AddRoom = ({ mutate }: {mutate: any}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const methods = useForm<AddRoomSchemaType>({
    resolver: zodResolver(AddRoomSchema)
  })

  const onSubmit: SubmitHandler<AddRoomSchemaType> = async (data) => {
    try {
      const { data: addedRoom } = await RoomService.create(data);
      mutate();
      methods.reset();
      toast.success("Thêm phòng thành công");
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
      }
    }
  }

  const handleCloseModal = () => {
    methods.clearErrors()
    onClose()
  }

  return (
    <>
      <Button color="primary" onPress={onOpen}>Thêm phòng</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Thêm phòng</ModalHeader>
              <ModalBody>
                <form className="flex justify-between scrollbar scrollbar-thin overflow-y-auto">
                  <div className="w-full max-h-80">
                    <FormProvider {...methods}>
                      <AddRoomForm />
                    </FormProvider>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={handleCloseModal}>
                  Đóng
                </Button>
                <Button color="primary" onClick={methods.handleSubmit(onSubmit)}>
                  Thêm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
