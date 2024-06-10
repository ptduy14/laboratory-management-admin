import { Category } from "@/components/category/category-table/data";
import { ResourceStatus, ResourceStatusName } from "@/enums/resource-status";

export interface Resource {
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
  category: Category;
  handoverStatus: number
}

export const resourceColumns = [
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

export const originOptions = [
  {
    name: "Đức",
    uid: "Đức"
  },
  {
    name: "Trung Quốc",
    uid: "Trung Quốc"
  },
  {
    name: "Việt Nam",
    uid: "Việt Nam"
  },
  {
    name: "Pháp",
    uid: "Pháp"
  },
  {
    name: "Nhật Bản",
    uid: "Nhật Bản"
  }
]

export const statusOptions = [
  {
    uid: ResourceStatus.NORMAL_OPERATION,
    name: ResourceStatusName[ResourceStatus.NORMAL_OPERATION]
  },
  {
    uid: ResourceStatus.STILL_IN_GOOD_USE,
    name: ResourceStatusName[ResourceStatus.STILL_IN_GOOD_USE]
  },
  {
    uid: ResourceStatus.AWAITING_REPAIR,
    name: ResourceStatusName[ResourceStatus.AWAITING_REPAIR]
  },
  {
    uid: ResourceStatus.MALFUNCTIONING,
    name: ResourceStatusName[ResourceStatus.MALFUNCTIONING]
  }
]