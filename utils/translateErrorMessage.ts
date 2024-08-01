const errorMessages = {
    "Items that have been used in other features cannot be deleted": "Không thể xóa mục này do đang được sử dụng",
    "Please ensure the text does not contain leading, trailing, or multiple consecutive spaces.": "Hãy đảm bảo văn bản không chứa khoảng trắng ở đầu, cuối hoặc nhiều khoảng trắng liên tiếp.",
    "Email already exist": "Email đã tồn tại"
}

export const translateErrorMessage = (message: string) => {
    return errorMessages[message as keyof typeof errorMessages] || "Đã xảy ra lỗi"; // Trả về thông báo lỗi mặc định nếu không tìm thấy
  };