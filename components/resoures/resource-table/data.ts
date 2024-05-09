import { CategoryType } from "@/components/sidebar/sidebar";

export interface ResourceType {
  id: number;
  createBy: number;
  updateBy: number;
  name: string;
  origin: string;
  serial_number: string | null;
  specification: string;
  quantity: number;
  remark: string | null;
  unit: number;
  status: 2;
  category: CategoryType;
}

export const columns = [
  {
    key: "name",
    label: "TÊN",
  },
  {
    key: "origin",
    label: "XUẤT XỨ",
  },
  {
    key: "specification",
    label: "DUNG TÍCH",
  },
  {
    key: "quantity",
    label: "SỐ LƯỢNG",
  },
  {
    key: "unit",
    label: "ĐƠN VỊ",
  },
  {
    key: "status",
    label: "TRẠNG THÁI",
  },
  {
    key: "category",
    label: "DANH MỤC",
  },
  {
    key: "actions",
    label: "ACTIONS",
  },
];
