export enum RoleEnum {
    ADMIN = 0,
    MANAGER = 1,
    USER = 2
}

interface RoleNamesType {
    [key: number] : string
}

export const RoleNames: RoleNamesType = {
    [RoleEnum.ADMIN]: "Admin",
    [RoleEnum.MANAGER]: "Manager",
    [RoleEnum.USER]: "User"
}