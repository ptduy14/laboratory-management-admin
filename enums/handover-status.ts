export enum HandoverStatus {
    NOT_HANDED_OVER = 1,
    HANDED_OVER = 0
}

interface HandoverStatusNameType {
    [key: number]: string
}

export const HandoverStatusName: HandoverStatusNameType = {
    [HandoverStatus.NOT_HANDED_OVER]: "Chưa bàn giao",
    [HandoverStatus.HANDED_OVER]: "Đã bàn giao",
}