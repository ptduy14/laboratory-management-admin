import { late } from "zod";

export interface Category {
  id: number;
  name: string;
  status: number;
}

export const resourcesFromCategoryColumns = [
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
        key: "handoverStatus",
        label: "BÀN GIAO",
      },
      {
        key: "status",
        label: "TRẠNG THÁI",
      },
      {
        key: "actions",
        label: "ACTIONS",
      },
]

export const CategoryColumns = [
  {
    key: "name",
    label: "TÊN DANH MỤC"
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