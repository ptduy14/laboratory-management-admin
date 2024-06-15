export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);

  // Lấy ngày, tháng, năm
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0 nên cần +1
  const year = date.getUTCFullYear();

  // Lấy giờ, phút, giây
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  // Định dạng ngày và giờ
  const formattedDate = `${month}-${day}-${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

 return {
    formattedDate: formattedDate,
    formattedTime: formattedTime
 }
};
