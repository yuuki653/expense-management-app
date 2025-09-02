import React from "react";
import { Expense, Budget } from "../types/index";
import { getMonday, getWeekRange, isDateInWeek } from "../utils/dateUtils";

interface WeeklySummaryProps {
  expenses: Expense[];
  budget: Budget;
}

const WeeklySummary: React.FC<WeeklySummaryProps> = ({ expenses, budget }) => {
  const today = new Date();
  const monday = getMonday(today);
  const weekRange = getWeekRange(monday);
  const thisWeekExpenses = expenses.filter((expense) =>
    isDateInWeek(expense.date, weekRange.start, weekRange.end)
  );
  const spent = thisWeekExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const remaining = budget.amount - spent;

  return (
    <div className="w-[50%] mx-auto">
      <div className="bg-gray-100 rounded-md p-8 mt-10 text-center">
        <p className="text-xl font-bold mb-5">今週の記録</p>
        <div>
          <p>予算：{budget.amount.toLocaleString()}円</p>
          <p>支出：{spent.toLocaleString()}円</p>
          <p>残金：{remaining.toLocaleString()}円</p>
        </div>
      </div>
    </div>
  );
};

export default WeeklySummary;
