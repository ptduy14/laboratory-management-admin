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

export const AddUser = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                    <div className="w-1/3 pr-10">
                      <Avatar
                        radius="none"
                        className="w-full h-50"
                        src={"https://i.pravatar.cc/150?u=a04258114e29026302d"}
                      />
                      <div>
                        <div className="mb-2"></div>
                        <input
                          className="block w-full text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                          aria-describedby="file_input_help"
                          id="file_input"
                          type="file"
                        ></input>
                        <p
                          className="mt-1 text-xs text-gray-500 dark:text-gray-300"
                          id="file_input_help"
                        >
                          SVG, PNG, JPG or GIF
                        </p>
                      </div>
                    </div>

                    <div className="w-2/3 max-h-80">
                      <Input
                        className="mb-7"
                        label="Email"
                        variant="bordered"
                      />
                      <Input
                        className="mb-7"
                        label="First Name"
                        variant="bordered"
                      />
                      <Input
                        className="mb-7"
                        label="Last Name"
                        variant="bordered"
                      />
                      <Input
                        className="mb-7"
                        label="Phone Number"
                        variant="bordered"
                      />

                      <Input
                        className="mb-7"
                        label="Password"
                        type="password"
                        variant="bordered"
                      />
                      <Input
                        className="mb-7"
                        label="Confirm Password"
                        type="password"
                        variant="bordered"
                      />
                    </div>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Add User
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
