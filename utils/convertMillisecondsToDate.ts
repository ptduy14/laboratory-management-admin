export const convertMillisecondsToDate = (milliseconds: string): string => {
    const timestamp = parseInt(milliseconds, 10);
    
    const date = new Date(timestamp);
  
    // Lấy ngày, tháng, năm
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
  
    return formattedDate;
  }