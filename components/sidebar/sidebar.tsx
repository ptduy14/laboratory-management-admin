import React, { useEffect, useState } from "react";
import { Sidebar } from "./sidebar.styles";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";
import { RoomService } from "@/services/roomService";
import { CategoryService } from "@/services/categoryService";
import { getCategoryIcon } from "./getCategoryIcon";
import { ResoucesIcon } from "../icons/resources-icon";
import { PlusSquareIcon } from "../icons/plus-square-icon";
import { Category } from "../category/category-table/data";
import useSWR from "swr";
import { RoomType } from "@/types/room";
import { CategoryStatus } from "@/enums/category-status";
import { RoomStatus } from "@/enums/room-status";
import { ReportsIcon } from "../icons/sidebar/reports-icon";


export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  // const [categories, setCategories] = useState<Category[]>([]);

  const { data: rooms } = useSWR("/rooms", async (url) => {
    const { data } = await RoomService.getAll(url);
    return data;
  });

  const { data: categories } = useSWR("/categories", async (url) => {
    const { data } = await CategoryService.getAll(url);
    return data;
  });

  // useEffect(() => {
  //   getAllRoom();
  //   getAllCategory();
  // }, []);

  // const getAllRoom = async () => {
  //   const { data } = await RoomService.getAll();
  //   setRooms(data);
  // };

  // const getAllCategory = async () => {
  //   try {
  //     const { data } = await CategoryService.getAll();
  //     setCategories(data);
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.log(error.response?.data.message);
  //     }
  //   }
  // };
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
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Logo_ctuet.png"
            className="w-20 mx-auto"
          />
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
                href="/accounts"
              />
              <SidebarItem
                isActive={pathname === "/resources"}
                title="Tài nguyên"
                icon={<ResoucesIcon />}
                href="/resources"
              />
              <SidebarItem
                isActive={pathname === "/registration"}
                title="Phiếu mượn"
                icon={<ReportsIcon />}
                href="/registrations"
              />
            </SidebarMenu>
            <SidebarMenu title="Danh Mục">
              {categories?.data.map((category: Category) => {
                if (category.status === CategoryStatus.ACTIVE) {
                  return (
                    <SidebarItem
                      key={category.id}
                      isActive={
                        pathname === `/categories/${category.id}/resources`
                      }
                      title={category.name}
                      icon={getCategoryIcon(category.id)}
                      href={`/categories/${category.id}/resources`}
                    />
                  );
                }
              })}
              <SidebarItem
                isActive={pathname === "/categories"}
                title="Quản lí danh mục"
                icon={<PlusSquareIcon />}
                href="/categories"
              />
            </SidebarMenu>
            <SidebarMenu title="Phòng thí nghiệm">
              {rooms?.data.map((room: any) => {
                if (room.status === RoomStatus.ACTIVE) {
                  return (
                    <SidebarItem
                      key={room.id}
                      isActive={pathname === `/rooms/${room.id}/resources`}
                      title={room.name}
                      href={`/rooms/${room.id}/resources`}
                    />
                  );
                }
              })}
              <SidebarItem
                isActive={pathname === "/rooms"}
                title="Quản lí PTN"
                icon={<PlusSquareIcon />}
                href="/rooms"
              />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
