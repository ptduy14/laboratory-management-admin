import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";
import React from "react";
import { NotificationIcon } from "../icons/navbar/notificationicon";
import { useSession } from "next-auth/react";

export const NotificationsDropdown = () => {
  const { data: session } = useSession();
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <NavbarItem>
          <NotificationIcon />
        </NavbarItem>
      </DropdownTrigger>
      <DropdownMenu className="w-80" aria-label="Avatar Actions">
        <DropdownSection title="Notificacions">
          {session?.user.userInfo.hasOwnProperty('password') && session?.user.userInfo.password === null ? (
            <DropdownItem
              classNames={{
                base: "py-2",
                title: "text-base font-semibold",
              }}
              key="1"
              description="Vì lý do bảo mật, bạn cần cập nhật mật khẩu của mình. Hãy đảm bảo mật khẩu mới mạnh và khó đoán để bảo vệ tài khoản của bạn tốt hơn.">
              📣 Cập nhật mật khẩu của bạn
            </DropdownItem>
          ) : (
            <DropdownItem
              description="Bạn không có thông báo nào">
            </DropdownItem>
          )}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
