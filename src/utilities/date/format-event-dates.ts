import dayjs from "dayjs";

export const formatEventDates = (startDate: string, endDate: string): string => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
//   Xử lý trường hợp giờ bắt đầu và giờ kết thúc là cùng giờ
  if (start.isSame(end, 'hour')) {
    return start.format('MMMM Do YYYY h:mm a') ; 
  } 
  
  return `${start.format('MMMM Do YYYY h:mm')} - ${end.format('MMMM Do YYYY h:mm')}`;
};


