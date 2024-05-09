import React, { useEffect, useState } from "react";
import { Sidebar } from "./sidebar.styles";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { FilterIcon } from "../icons/sidebar/filter-icon";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { RoomService } from "@/services/roomService";
import { CategoryService } from "@/services/categoryService";
import { getCategoryIcon } from "./getCategoryIcon";
import { ResoucesIcon } from "../icons/resources-icon";

export interface RoomType {
  id: number;
  name: string;
}

export interface CategoryType {
  id: number;
  name: string;
  status: boolean;
}

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    getAllRoom();
    getAllCategory();
  }, []);

  const getAllRoom = async () => {
    const { data } = await RoomService.getAll();
    setRooms(data);
  };

  const getAllCategory = async () => {
    const { data } = await CategoryService.getAll();
    setCategories(data);
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
                isActive={pathname === "/resources"}
                title="Tài nguyên"
                icon={<ResoucesIcon />}
                href="/resources"
              />
            </SidebarMenu>
            <SidebarMenu title="Danh Mục">
              {categories.map((category) => {
                return (
                  <SidebarItem
                    key={category.id}
                    isActive={pathname === `/items/category/${category.id}`}
                    title={category.name}
                    icon={getCategoryIcon(category.id)}
                  />
                );
              })}
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
