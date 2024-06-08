export enum ResourceStatus {
    NORMAL_OPERATION = 0,
    STILL_IN_GOOD_USE = 1,
    AWAITING_REPAIR = 2,
    MALFUNCTIONING = 4
}

interface ResourceStatusNameType {
    [key: number]: string
}

export const ResourceStatusName: ResourceStatusNameType = {
    [ResourceStatus.NORMAL_OPERATION]: "Hoạt động bình thường",
    [ResourceStatus.STILL_IN_GOOD_USE]: "Hoạt động tốt",
    [ResourceStatus.AWAITING_REPAIR]: "Chờ sửa chửa",
    [ResourceStatus.MALFUNCTIONING]: "Không hoạt động được",
}