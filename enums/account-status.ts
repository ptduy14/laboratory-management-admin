export enum AccountStatus {
    ACTIVE = 0,
    INACTIVE = 1,
}

interface AccountStatusNamesType {
    [key: number]: string
}

export const AccountStatusNames: AccountStatusNamesType = {
    [AccountStatus.ACTIVE]: "Active",
    [AccountStatus.INACTIVE]: "Inactive"
}