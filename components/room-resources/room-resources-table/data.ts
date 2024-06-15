import { Resource } from "@/components/resoures/resource-table/data";

export interface ResourcesTransfered {
  id: number;
  status: number;
  quantity: number;
  itemQuantityBorrowed: number;
  itemQuantityReturned: number;
  year: string;
  remark: string | null;
  item: Resource;
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
        key: "unit",
        label: "ĐƠN VỊ TÍNH"
    }
]
