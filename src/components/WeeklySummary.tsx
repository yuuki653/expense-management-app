import React from "react";
import { Expense, Budget } from "../types/index";
import { formatShortDate } from "../utils/dateUtils";

interface WeeklySummaryProps {
  budget: Budget;
  weekOffset: number;
  setWeekOffset: (offset: number) => void;
  weekRange: { start: string; end: string };
  thisWeekExpenses: Expense[];
}

const WeeklySummary: React.FC<WeeklySummaryProps> = ({
  budget,
  weekOffset,
  setWeekOffset,
  weekRange,
  thisWeekExpenses,
}) => {
  const spent = thisWeekExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const remaining = budget.amount - spent;

  return (
    <div className="mx-auto w-60 border-2 rounded-md py-3 text-center">
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
      <p className="mb-3">
        {formatShortDate(weekRange.start)} ～ {formatShortDate(weekRange.end)}
      </p>
      <div>
        <p>予算：¥ {budget.amount.toLocaleString()}</p>
        <p>支出：¥ {spent.toLocaleString()}</p>
        <p>残金：¥ {remaining.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default WeeklySummary;
