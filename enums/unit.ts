export enum UnitEnum {
    BOTTLE = 1,
    PEACE = 2,
    SET = 3,
    BOX = 4,
    BAG = 5,
    PACK = 6,
    SACHET = 7,
}

interface UnitEnumNamesType {
    [key: number]: string
}

export const UnitEnumNames: UnitEnumNamesType = {
    [UnitEnum.BOTTLE]: "Chai",
    [UnitEnum.PEACE]: "Cái",
    [UnitEnum.SET]: "Bộ",
    [UnitEnum.BOX]: "Hộp",
    [UnitEnum.BAG]: "Túi",
    [UnitEnum.PACK]: "Bọc",
    [UnitEnum.SACHET]: "Gói",
}