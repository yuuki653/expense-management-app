export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const getDayString = ["日", "月", "火", "水", "木", "金", "土"];

  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日(${
    getDayString[date.getDay()]
  })`;
};
