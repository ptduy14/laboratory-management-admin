export interface Category {
  id: number;
  name: string;
  status: number;
}

export const categoryResourcesColumns = [
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
    key: "available",
    label: "CÓ SẴNG",
  },
  {
    key: "handover",
    label: "ĐÃ BÀN GIAO",
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
    key: "actions",
    label: "ACTIONS",
  },
];

export const CategoryColumns = [
  {
    key: "name",
    label: "TÊN DANH MỤC",
  },
  {
    key: "status",
    label: "TRẠNG THÁI",
  },
  {
    key: "actions",
    label: "ACTIONS",
  },
];
