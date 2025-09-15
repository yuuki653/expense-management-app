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
    <div className="w-60 mx-auto my-5">
      <ul>
        {descExpenselist.map((expense) => (
          <li key={expense.id}>
            <div className="flex flex-col">
              <div className="flex items-center bg-orange-100 px-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.013 2.513a1.75 1.75 0 0 1 2.475 2.474L6.226 12.25a2.751 2.751 0 0 1-.892.596l-2.047.848a.75.75 0 0 1-.98-.98l.848-2.047a2.75 2.75 0 0 1 .596-.892l7.262-7.261Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="ml-4">{formatShortDate(expense.date)}</p>
                <p className="ml-4">¥ {expense.amount.toLocaleString()}</p>
              </div>
              <div className="flex items-center ml-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-4"
                >
                  <path d="M2 3.5A1.5 1.5 0 0 1 3.5 2h2.879a1.5 1.5 0 0 1 1.06.44l1.122 1.12A1.5 1.5 0 0 0 9.62 4H12.5A1.5 1.5 0 0 1 14 5.5v1.401a2.986 2.986 0 0 0-1.5-.401h-9c-.546 0-1.059.146-1.5.401V3.5ZM2 9.5v3A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 12.5 8h-9A1.5 1.5 0 0 0 2 9.5Z" />
                </svg>

                <p className="flex ml-4">
                  {getCategoryName(expense.category, categories)}
                </p>
              </div>
              {expense.memo && (
                <div className="flex items-center ml-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="size-4"
                  >
                    <path d="M7.25 3.688a8.035 8.035 0 0 0-4.872-.523A.48.48 0 0 0 2 3.64v7.994c0 .345.342.588.679.512a6.02 6.02 0 0 1 4.571.81V3.688ZM8.75 12.956a6.02 6.02 0 0 1 4.571-.81c.337.075.679-.167.679-.512V3.64a.48.48 0 0 0-.378-.475 8.034 8.034 0 0 0-4.872.523v9.268Z" />
                  </svg>

                  <p className="ml-4">{expense.memo}</p>
                </div>
              )}
              <div className="flex items-center ml-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.78 7.595a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06l2.72-2.72-2.72-2.72a.75.75 0 0 1 1.06-1.06l3.25 3.25Zm-8.25-3.25 3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06l2.72-2.72-2.72-2.72a.75.75 0 0 1 1.06-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>

                <button
                  onClick={() => {
                    setEditingExpense(expense);
                  }}
                  className="ml-4 hover:underline decoration-2 underline-offset-4 text-blue-400 hover:text-blue-800 rounded-md transition-colors"
                >
                  編集
                </button>
                <button
                  onClick={() => {
                    deleteExpense(expense.id);
                  }}
                  className="ml-2 hover:underline decoration-2 underline-offset-4 text-red-400 hover:text-red-800 rounded-md transition-colors"
                >
                  削除
                </button>
              </div>
            </div>
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
    </div>
  );
};

export default ExpenseList;
