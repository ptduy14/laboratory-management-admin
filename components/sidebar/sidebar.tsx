import React, { useEffect, useState } from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip } from "@nextui-org/react";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { DevIcon } from "../icons/sidebar/dev-icon";
import { ViewIcon } from "../icons/sidebar/view-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { FilterIcon } from "../icons/sidebar/filter-icon";
import { useSidebarContext } from "../layout/layout-context";
import { ChangeLogIcon } from "../icons/sidebar/changelog-icon";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { RoleEnum } from "@/enums/role";
import { ChemicalIcon } from "../icons/chemical-icon";
import { ToolIcon } from "../icons/tool-icons";
import { EquipmentIcon } from "../icons/equiptment-icon";
import { RoomService } from "@/services/roomService";

export interface RoomType {
  id: number;
  name: string;
}

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  const { data: session } = useSession();
  const [rooms, setRooms] = useState<RoomType[]>([]);
  useEffect(() => {
    getAllRoom();
  }, []);

  const getAllRoom = async () => {
    const { data } = await RoomService.getAll();
    setRooms(data);
  };

  return (
    <aside className="h-screen z-[202] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={pathname === "/accounts"}
                title="Accounts"
                icon={<AccountsIcon />}
                href="accounts"
              />

              <SidebarItem
                isActive={pathname === "/payments"}
                title="Hóa chất"
                icon={<ChemicalIcon />}
              />
              <SidebarItem
                isActive={pathname === "/customers"}
                title="Dụng cụ"
                icon={<ToolIcon />}
              />
              <SidebarItem
                isActive={pathname === "/reports"}
                title="Thiết bị"
                icon={<EquipmentIcon />}
              />
              <CollapseItems
                icon={<FilterIcon />}
                items={rooms}
                title="Phòng"
              />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
