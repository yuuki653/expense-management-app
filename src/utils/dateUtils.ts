import { Expense } from "../types";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const getDayString = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}(${
    getDayString[date.getDay()]
  })`;
};

export const formatShortDate = (dateString: string): string => {
  const date = new Date(dateString);

  const getDayString = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  return `${date.getMonth() + 1}/${date.getDate()}(${
    getDayString[date.getDay()]
  })`;
};

export const getSaturday = (date: Date): Date => {
  const dayOfWeek = date.getDay();
  const daysFromSaturday = dayOfWeek === 6 ? 0 : dayOfWeek + 1;

  const saturday = new Date(date);
  saturday.setDate(date.getDate() - daysFromSaturday);
  return saturday;
};

export const getWeekRange = (
  saturday: Date
): { start: string; end: string } => {
  const friday = new Date(saturday);
  friday.setDate(saturday.getDate() + 6);

  const formatDateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return {
    start: formatDateToString(saturday),
    end: formatDateToString(friday),
  };
};

export const getMonthRange = (
  startDate: Date
): { start: string; end: string } => {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 34);

  const formatDateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return {
    start: formatDateToString(startDate),
    end: formatDateToString(endDate),
  };
};

export const isDateInWeek = (
  dateString: string,
  weekStart: string,
  weekEnd: string
): boolean => {
  return dateString >= weekStart && dateString <= weekEnd;
};

export const isDateInMonth = (
  dateString: string,
  monthStart: string,
  monthEnd: string
): boolean => {
  return dateString >= monthStart && dateString <= monthEnd;
};

export const generateCalendarDates = (startDate: Date): string[] => {
  const dates: string[] = [];

  for (let i = 0; i < 35; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    dates.push(`${year}-${month}-${day}`);
  }
  return dates;
};

export const getDailyTotal = (date: string, expenses: Expense[]): number => {
  return expenses
    .filter((expense) => expense.date === date)
    .reduce((total, expense) => total + expense.amount, 0);
};
