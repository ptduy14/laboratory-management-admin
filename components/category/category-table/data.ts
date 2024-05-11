export interface Category {
  id: number;
  name: string;
  status: number;
}

export const resourceFromCategoryColumns = [
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
        key: "actions",
        label: "ACTIONS",
      },
]