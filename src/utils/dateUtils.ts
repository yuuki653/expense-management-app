export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const getDayString = ["日", "月", "火", "水", "木", "金", "土"];

  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日(${
    getDayString[date.getDay()]
  })`;
};

export const getMonday = (date: Date): Date => {
  const dayOfWeek = date.getDay();
  const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const monday = new Date(date);
  monday.setDate(date.getDate() - daysFromMonday);
  return monday;
};

export const getWeekRange = (monday: Date): { start: string; end: string } => {
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const formatDateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate() + 1).padStart(2, "0");
    return `${year}--${month}--${day}`;
  };

  return {
    start: formatDateToString(monday),
    end: formatDateToString(sunday),
  };
};

export const isDateInWeek = (
  dateString: string,
  weekStart: string,
  weekEnd: string
): Boolean => {
  return dateString >= weekStart && dateString <= weekEnd;
};
