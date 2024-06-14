export enum RoomStatus {
    ACTIVE = 0,
    INACTIVE = 1,
}

interface RoomStatusNamesType {
    [key: number]: string
}

export const RoomStatusNames: RoomStatusNamesType = {
    [RoomStatus.ACTIVE]: "Active",
    [RoomStatus.INACTIVE]: "Inactive"
}