import React, { useState } from "react";
import { Expense, Budget } from "../types/index";
import {
  formatShortDate,
  getSaturday,
  getWeekRange,
  isDateInWeek,
} from "../utils/dateUtils";

interface WeeklySummaryProps {
  expenses: Expense[];
  budget: Budget;
  weekOffset: number;
  setWeekOffset: (offset: number) => void;
}

const WeeklySummary: React.FC<WeeklySummaryProps> = ({
  expenses,
  budget,
  weekOffset,
  setWeekOffset,
}) => {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + weekOffset * 7);
  const saturday = getSaturday(targetDate);
  const weekRange = getWeekRange(saturday);
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
        <div className="flex justify-center gap-5 text-xl font-bold mb-5">
          <button
            onClick={() => {
              setWeekOffset(weekOffset - 1);
            }}
          >
            ◁
          </button>
          <p>1週間の記録</p>
          <button
            onClick={() => {
              setWeekOffset(weekOffset + 1);
            }}
          >
            ▷
          </button>
        </div>
        <p>
          {formatShortDate(weekRange.start)} ～ {formatShortDate(weekRange.end)}
        </p>
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
