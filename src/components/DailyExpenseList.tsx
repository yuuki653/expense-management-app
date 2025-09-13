import React, { useState } from "react";
import { Expense, Category } from "../types/index";
import { formatDate } from "../utils/dateUtils";
import { getCategoryName } from "../utils/categoryUtils";
import EditExpenseModal from "./EditExpenseModal";

interface DailyExpenseListProps {
  expenses: Expense[];
  categories: Category[];
  selectedDate: string;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, updateExpense: Expense) => void;
}

const DailyExpenseList: React.FC<DailyExpenseListProps> = ({
  expenses,
  categories,
  selectedDate,
  deleteExpense,
  updateExpense,
}) => {
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const dailyExpenses = expenses.filter(
    (expense) => expense.date === selectedDate
  );

  return (
    <>
      <p>{formatDate(selectedDate)}</p>
      {dailyExpenses.length === 0 ? (
        <p>💰No Money Day</p>
      ) : (
        <ul>
          {dailyExpenses.map((expense) => (
            <li key={expense.id}>
              <span className="flex">
                <p>💰{expense.amount.toLocaleString()}円</p>
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
      )}

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

export default DailyExpenseList;
