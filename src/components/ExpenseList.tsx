import React, { useState } from "react";
import { Expense, Category } from "../types/index";
import { formatShortDate } from "../utils/dateUtils";
import { getCategoryName } from "../utils/categoryUtils";
import EditExpenseModal from "./EditExpenseModal";

interface ExpenseListProps {
  categories: Category[];
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, updateExpense: Expense) => void;
  thisWeekExpenses: Expense[];
}

const ExpenseList: React.FC<ExpenseListProps> = ({
  categories,
  deleteExpense,
  updateExpense,
  thisWeekExpenses,
}) => {
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const descExpenselist = [...thisWeekExpenses].sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date)
  );

  return (
    <>
      <div>支出一覧</div>
      <ul>
        {descExpenselist.map((expense) => (
          <li key={expense.id}>
            <span className="flex">
              <p>{formatShortDate(expense.date)}</p>
              <p>¥ {expense.amount.toLocaleString()}</p>
              <p className="flex">
                （{getCategoryName(expense.category, categories)}
                {expense.memo && <p>：{expense.memo}</p>}）
              </p>
              <button
                onClick={() => {
                  setEditingExpense(expense);
                }}
              >
                編集
              </button>
              <button
                onClick={() => {
                  deleteExpense(expense.id);
                }}
              >
                削除
              </button>
            </span>
          </li>
        ))}
      </ul>

      {editingExpense && (
        <EditExpenseModal
          editingExpense={editingExpense}
          setEditingExpense={setEditingExpense}
          categories={categories}
          onSave={(updatedExpense) => {
            updateExpense(updatedExpense.id, updatedExpense);
            setEditingExpense(null);
          }}
          onClose={() => setEditingExpense(null)}
        />
      )}
    </>
  );
};

export default ExpenseList;
