export interface Room {
    id: number,
    name: string,
    remark: string,
    status: number,
    quantity: number
}

export const RoomColumns = [
    {
        key: "name",
        label: "TÊN PHÒNG"
    },
    {
        key: "status",
        label: "TRẠNG THÁI"
    },
    {
        key: "remark",
        label: "GHI CHÚ"
    },
    {
        key: "quantity",
        label: "TÀI NGUYÊN ĐÃ BÀN GIAO"
    },
    {
        key: "actions",
        label: "ACTIONS"
    },
]