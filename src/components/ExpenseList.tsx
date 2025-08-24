import React from "react";
import { Expense, Category } from "../types/index";
import { formatDate } from "../utils/dateUtils";
import { getCategoryName } from "../utils/categoryUtils";

interface ExpenseListProps {
  expenses: Expense[];
  categories: Category[];
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, categories }) => {
  const descExpenselist = [...expenses].sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date)
  );

  return (
    <>
      <div>今週の支出</div>
      <ul>
        {descExpenselist.map((expense) => (
          <li key={expense.id}>
            <span className="flex">
              <p>{formatDate(expense.date)}</p>
              <p>{expense.amount.toLocaleString()}円</p>
              <p className="flex">
                （{getCategoryName(expense.category, categories)}
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
