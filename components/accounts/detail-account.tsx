import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Tooltip,
  Avatar,
  Chip,
} from "@nextui-org/react";
import { EyeIcon } from "@/components/icons/table/eye-icon";
import React, { useState, useEffect } from "react";
import { UserService } from "@/services/userService";
import { Account } from "./account-table/data";
import { LoaderImageText } from "../loader/loader-image-text";
import { RoleNames } from "@/enums/role";
import { AccountStatusNames } from "@/enums/account-status";
import useSWR from "swr";
import { accountFetcher } from "@/utils/fetchers/accounts-fetchers.ts/accountFetcher";

export const DetailAccount = ({ accountId }: { accountId: number }) => {
  // const [account, setAccount] = useState<Account>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: account, isLoading: isFetchingAccount } = useSWR<Account>(
    isOpen ? `/users/get/${accountId.toString()}` : null,
    accountFetcher
  );

  // useEffect(() => {
  //   if (isOpen) {
  //     getAccountById();
  //   }
  // }, [isOpen]);

  // const getAccountById = async () => {
  //   const { data } = await UserService.getById(accountId.toString());
  //   setAccount(data);
  // };

  return (
    <div>
      <div>
        <Tooltip content="Details">
          <button onClick={onOpen}>
            <EyeIcon size={20} fill="#979797" />
          </button>
        </Tooltip>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Account Detail</ModalHeader>
              <ModalBody>
                {!isFetchingAccount && account ? (
                  <div className="flex justify-between">
                    <div className="w-1/3 pr-10">
                      <Avatar
                        radius="none"
                        className="w-full h-full"
                        src={account.photo ? account.photo : ""}
                      />
                    </div>
                    <div className="w-2/3">
                      <label className="flex mb-1.5">
                        <span className="w-1/3 block font-semibold">Account id:</span>
                        <span className="w-2/3 block font-light">{accountId}</span>
                      </label>
                      <label className="flex mb-1.5">
                        <span className="w-1/3 block font-semibold">Họ tên:</span>
                        <span className="w-2/3 block font-light">
                          {account?.firstName ? account?.firstName + account?.lastName : ""}
                        </span>
                      </label>
                      <label className="flex mb-1.5">
                        <span className="w-1/3 block font-semibold">Email:</span>
                        <span className="w-2/3 block font-light">{account?.email}</span>
                      </label>
                      <label className="flex mb-1.5">
                        <span className="w-1/3 block font-semibold">Số điện thoại:</span>
                        <span className="w-2/3 block font-light">
                          {account?.phone ? account.phone : "null"}
                        </span>
                      </label>
                      <label className="flex mb-1.5">
                        <span className="w-1/3 block font-semibold">Địa chỉ:</span>
                        <span className="w-2/3 block font-light">
                          {account?.address ? account.address : "null"}
                        </span>
                      </label>
                      <label className="flex mb-1.5">
                        <span className="w-1/3 block font-semibold">Trạng thái:</span>
                        <span className="w-2/3 block font-light">
                          <Chip
                            size="sm"
                            variant="flat"
                            color={
                              account.status === 0
                                ? "success"
                                : account.status === 1
                                ? "danger"
                                : "warning"
                            }>
                            <span className="capitalize text-xs">
                              {AccountStatusNames[account.status]}
                            </span>
                          </Chip>
                        </span>
                      </label>
                      <label className="flex mb-1.5">
                        <span className="w-1/3 block font-semibold">Vai trò:</span>
                        <span className="w-2/3 block font-light">{RoleNames[account.role]}</span>
                      </label>
                      <label className="flex mb-1.5">
                        <span className="w-1/3 block font-semibold">Ngày tạo:</span>
                        <span className="w-2/3 block font-light">{account?.createdAt}</span>
                      </label>
                    </div>
                  </div>
                ) : (
                  <LoaderImageText />
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
