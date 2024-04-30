export enum Status {
    ACTIVE = 0,
    INACTIVE = 1,
}

interface StatusNamesType {
    [key: number]: string
}

export const StatusNames: StatusNamesType = {
    [Status.ACTIVE]: "Active",
    [Status.INACTIVE]: "Inactive"
}