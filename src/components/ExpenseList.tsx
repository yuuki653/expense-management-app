import React from "react";
import { Expense, Category } from "../types/index";
import {
  formatDate,
  getMonday,
  getWeekRange,
  isDateInWeek,
} from "../utils/dateUtils";
import { getCategoryName } from "../utils/categoryUtils";

interface ExpenseListProps {
  expenses: Expense[];
  categories: Category[];
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, categories }) => {
  console.log("expenseList");
  const today = new Date();
  const monday = getMonday(today);
  const weekRange = getWeekRange(monday);
  const thisWeekExpenses = expenses.filter((expense) =>
    isDateInWeek(expense.date, weekRange.start, weekRange.end)
  );

  const descExpenselist = [...thisWeekExpenses].sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date)
  );

  console.log(weekRange);
  console.log(thisWeekExpenses);

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
