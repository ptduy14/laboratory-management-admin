export enum RegistrationStatus {
  PENDING = 0,
  APPROVED = 1,
}

interface RegistrationStatusNamesType {
    [key: number]: string
}

export const RegistrationStatusNames: RegistrationStatusNamesType = {
    [RegistrationStatus.PENDING]: "Chờ duyệt",
    [RegistrationStatus.APPROVED]: "Đã duyệt"
}