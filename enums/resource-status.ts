export enum ResourceStatus {
  NORMAL_OPERATION = 0,
  STILL_IN_GOOD_USE = 1,
  AWAITING_REPAIR = 2,
  MALFUNCTIONING = 4,
}

interface ResourceStatusNameType {
  [key: number]: string;
}

export const ResourceStatusName: ResourceStatusNameType = {
  [ResourceStatus.NORMAL_OPERATION]: "Bình thường",
  [ResourceStatus.STILL_IN_GOOD_USE]: "Tốt",
  [ResourceStatus.AWAITING_REPAIR]: "Chờ sửa",
  [ResourceStatus.MALFUNCTIONING]: "Hỏng",
};
