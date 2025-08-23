import React from "react";
import { Expense } from "../types/index";

interface WeeklySummaryProps {
  expenses: Expense[];
}

const WeeklySummary: React.FC<WeeklySummaryProps> = ({ expenses }) => {
  const budget = 10000;
  const spent = expenses.reduce((total, expense) => total + expense.amount, 0);
  const remaining = budget - spent;

  return (
    <div className="w-[50%] mx-auto">
      <div className="bg-gray-100 rounded-md p-8 mt-10 text-center">
        <p className="text-xl font-bold mb-5">今週の記録</p>
        <div>
          <p>予算：{budget.toLocaleString()}円</p>
          <p>支出：{spent.toLocaleString()}円</p>
          <p>残金：{remaining.toLocaleString()}円</p>
        </div>
      </div>
    </div>
  );
};

export default WeeklySummary;
