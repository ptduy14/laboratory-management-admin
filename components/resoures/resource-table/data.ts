import { CategoryType } from "@/components/sidebar/sidebar";
import { StatusResource, StatusResourceName } from "@/enums/status-resource";

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
  }
]

export const statusOptions = [
  {
    uid: StatusResource.NORMAL_OPERATION,
    name: StatusResourceName[StatusResource.NORMAL_OPERATION]
  },
  {
    uid: StatusResource.STILL_IN_GOOD_USE,
    name: StatusResourceName[StatusResource.STILL_IN_GOOD_USE]
  },
  {
    uid: StatusResource.AWAITING_REPAIR,
    name: StatusResourceName[StatusResource.AWAITING_REPAIR]
  },
  {
    uid: StatusResource.MALFUNCTIONING,
    name: StatusResourceName[StatusResource.MALFUNCTIONING]
  }
]