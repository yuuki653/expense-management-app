import React, { useState } from "react";
import { Expense, Category } from "../types/index";
import { formatDate } from "../utils/dateUtils";
import { getCategoryName } from "../utils/categoryUtils";

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
  const [editAmount, setEditAmount] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editMemo, setEditMemo] = useState("");

  const dailyExpenses = expenses.filter(
    (expense) => expense.date === selectedDate
  );

  const handleSave = () => {
    if (!editAmount || isNaN(Number(editAmount)) || !editDate) {
      alert("金額と日付は必須です");
      return;
    }
    if (editingExpense) {
      const updatedExpense: Expense = {
        id: editingExpense.id,
        amount: Number(editAmount),
        category: editCategory,
        date: editDate,
        memo: editMemo,
      };
      updateExpense(editingExpense.id, updatedExpense);
      setEditingExpense(null);
    }
  };

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
                    setEditAmount(expense.amount.toString());
                    setEditCategory(expense.category);
                    setEditDate(expense.date);
                    setEditMemo(expense.memo || "");
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
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setEditingExpense(null)}
          ></div>
          <div className="bg-white rounded-lg p-6 w-96 z-10">
            <h2 className="text-xl font-bold mb-4">支出を編集</h2>

            <input
              type="text"
              placeholder="金額"
              value={editAmount}
              onChange={(e) => setEditAmount(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <select
              name="category"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="メモ"
              value={editMemo}
              onChange={(e) => setEditMemo(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />

            <div className="flex gap-2 mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSave}
              >
                保存
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setEditingExpense(null)}
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DailyExpenseList;
