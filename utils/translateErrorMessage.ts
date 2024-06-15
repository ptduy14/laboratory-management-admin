const errorMessages = {
    "Items that have been used in other features cannot be deleted": "Không thể xóa mục này do đang được sử dụng"
}

export const translateErrorMessage = (message: string) => {
    return errorMessages[message as keyof typeof errorMessages] || "Đã xảy ra lỗi"; // Trả về thông báo lỗi mặc định nếu không tìm thấy
  };