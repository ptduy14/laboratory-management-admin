export enum StatusResource {
    NORMAL_OPERATION = 0,
    STILL_IN_GOOD_USE = 1,
    AWAITING_REPAIR = 2,
    MALFUNCTIONING = 4
}

interface StatusResourceNameType {
    [key: number]: string
}

export const StatusResourceName: StatusResourceNameType = {
    [StatusResource.NORMAL_OPERATION]: "Hoạt động bình thường",
    [StatusResource.STILL_IN_GOOD_USE]: "Hoạt động tốt",
    [StatusResource.AWAITING_REPAIR]: "Chờ sửa chửa",
    [StatusResource.MALFUNCTIONING]: "Không hoạt động được",
}