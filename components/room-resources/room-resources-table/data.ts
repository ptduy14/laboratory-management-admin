import { Resource } from "@/components/resoures/resource-table/data";
import { Room } from "@/components/rooms/room-table/data";

export interface ResourcesTransfered {
  id: number;
  status: number;
  quantity: number;
  itemQuantityBorrowed: number;
  itemQuantityReturned: number;
  year: string;
  remark: string | null;
  createdAt: string,
  item: Resource;
  room: Room
}

export const ResourcesTransferedColumns = [
    {
        key: "name",
        label: "TÊN TÀI NGUYÊN"
    },
    {
        key: "specification",
        label: "DUNG TÍCH"
    },
    {
        key: "quantity",
        label: "SỐ LƯỢNG BÀN GIAO"
    },
    {
        key: "itemQuantityBorrowed",
        label: "ĐÃ MƯỢN"
    },
    {
        key: "itemQuantityReturned",
        label: "ĐÃ TRẢ"
    },
    {
        key: "unit",
        label: "ĐƠN VỊ TÍNH"
    },
    {
        key: "status",
        label: "TRẠNG THÁI"
    },
    {
        key: "actions",
        label: "ACTIONS"
    }
]
