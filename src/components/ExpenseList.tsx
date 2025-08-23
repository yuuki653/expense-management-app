import React from "react";
import { Expense } from "../types/index";

interface ExpenseListProps {
  expenses: Expense[];
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  const descExpenselist = [...expenses].sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date)
  );

  const getCategoryName = (category: string) => {
    const categoryMap = {
      food: "食費",
      entertainment: "自由費",
      daily: "日用品費",
      medical: "医療費",
    };
    return categoryMap[category as keyof typeof categoryMap] || category;
  };

  return (
    <>
      <div>今週の支出</div>
      <ul>
        {descExpenselist.map((expense) => (
          <li key={expense.id}>
            <span className="flex">
              <p>{expense.date}</p>
              <p>{expense.amount.toLocaleString()}円</p>
              <p className="flex">
                （{getCategoryName(expense.category)}
                {expense.memo && <p>：{expense.memo}</p>}）
              </p>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ExpenseList;
