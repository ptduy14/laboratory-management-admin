import { Account } from "@/components/accounts/account-table/data";
import { Resource } from "@/components/resoures/resource-table/data";
import { Room } from "@/components/rooms/room-table/data";

export const registraionColumns = [
  {
    key: "id",
    label: "MÃ PHIẾU",
  },
  {
    key: "name",
    label: "NGƯỜI MƯỢN",
  },
  {
    key: "email",
    label: "EMAIL",
  },
  {
    key: "createdAt",
    label: "NGÀY TẠO PHIẾU",
  },
  {
    key: "status",
    label: "TRẠNG THÁI"
  },
  {
    key: "actions",
    label: "ACTIONS"
  }
];

export interface Registration {
  id: number;
  createdAt: string;
  updatedAt: string;
  createBy: number;
  updateBy: number;
  status: number;
  user: Account;
}

interface ResourceRegistration {
  id: number;
  status: number;
  quantity: number;
  quantityReturned: number;
  start_day: string;
  end_day: string;
  item: Resource;
  room: Room;
}

export interface RegistrationDetail {
  registration: Registration,
  items: ResourceRegistration[]
}