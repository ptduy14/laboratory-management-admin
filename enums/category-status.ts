export enum CategoryStatus {
    ACTIVE = 0,
    INACTIVE = 1,
}

interface CategoryStatusNamesType {
    [key: number]: string
}

export const CategoryStatusNames: CategoryStatusNamesType = {
    [CategoryStatus.ACTIVE]: "Active",
    [CategoryStatus.INACTIVE]: "Inactive"
}