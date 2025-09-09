import { itemAxisPredicate } from "recharts/types/state/selectors/axisSelectors";
import { Category, Expense } from "../types";
import { isDateInMonth } from "./dateUtils";

const CHART_COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
  "#8dd1e1",
  "#d084d0",
  "#ffb347",
  "#87ceeb",
];

export const getCategoryChartData = (
  expenses: Expense[],
  categories: Category[],
  startDate: string,
  endDate: string
) => {
  const thisPeriodExpenses = expenses.filter((expense) =>
    isDateInMonth(expense.date, startDate, endDate)
  );

  return categories
    .map((category, index) => {
      const categoryTotal = thisPeriodExpenses
        .filter((expense) => expense.category === category.id)
        .reduce((total, expense) => total + expense.amount, 0);

      return {
        name: category.name,
        value: categoryTotal,
        color: CHART_COLORS[index % CHART_COLORS.length],
      };
    })
    .filter((item) => item.value > 0);
};
