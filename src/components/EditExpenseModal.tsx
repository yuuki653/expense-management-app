import React, { useState } from "react";
import { Expense, Category } from "../types/index";

interface EditExpenseModalProps {
  editingExpense: Expense;
  setEditingExpense: (expense: Expense | null) => void;
  categories: Category[];
  onSave: (updatedExpense: Expense) => void;
  onClose: () => void;
}

const EditExpenseModal: React.FC<EditExpenseModalProps> = ({
  editingExpense,
  categories,
  onSave,
  onClose,
}) => {
  const [editAmount, setEditAmount] = useState(
    editingExpense.amount.toString()
  );
  const [editCategory, setEditCategory] = useState(editingExpense.category);
  const [editDate, setEditDate] = useState(editingExpense.date);
  const [editMemo, setEditMemo] = useState(editingExpense.memo || "");

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

      onSave(updatedExpense);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
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
            className="h-9 text-blue-700 underline decoration-2 underline-offset-4 px-3 hover:bg-blue-400 hover:text-gray-100 rounded-md transition-colors"
            onClick={handleSave}
          >
            保存
          </button>
          <button
            className="h-9 underline decoration-2 underline-offset-4 px-3 hover:bg-gray-500 hover:text-gray-100 rounded-md transition-colors"
            onClick={onClose}
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditExpenseModal;
