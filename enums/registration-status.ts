export enum RegistrationStatus {
  PENDING = 0,
  APPROVED = 1,
  CANCELED = 2,
  RETURNED = 3,
}

interface RegistrationStatusNamesType {
    [key: number]: string
}

export const RegistrationStatusNames: RegistrationStatusNamesType = {
    [RegistrationStatus.PENDING]: "Chờ duyệt",
    [RegistrationStatus.APPROVED]: "Đã duyệt",
    [RegistrationStatus.CANCELED]: "Đã hủy",
    [RegistrationStatus.RETURNED]: "Đã trả"
}