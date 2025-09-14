import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Expense, Category, Budget } from "../types";

interface InputFormProps {
  addExpense: (expenses: Expense) => void;
  categories: Category[];
  budget: Budget;
  setBudget: (amount: number) => void;
}

const InputForm: React.FC<InputFormProps> = ({
  addExpense,
  categories,
  budget,
  setBudget,
}) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [memo, setMemo] = useState("");
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [newBudgetAmount, setNewBudgetAmount] = useState("");

  const [error, setError] = useState("");

  const judgementError = () => {
    if (!amount.trim()) {
      setError("金額を入力してください");
      return false;
    }
    if (isNaN(Number(amount)) || Number(amount) < 0) {
      setError("正しい金額を入力してください");
      return false;
    }
    if (!date) {
      setError("日付を入力してください");
      return false;
    }
    setError("");
    return true;
  };

  const handleRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judgementError()) return;
    const newExpense: Expense = {
      id: Date.now().toString(),
      amount: Number(amount),
      category,
      date,
      memo,
    };
    addExpense(newExpense);
    setAmount("");
    setCategory(categories[0]?.id);
    setMemo("");
  };

  const handleBudgetEditStart = () => {
    setNewBudgetAmount(budget.amount.toString());
    setIsEditingBudget(true);
  };

  const handleBudgetEditSave = () => {
    setBudget(Number(newBudgetAmount));
    setIsEditingBudget(false);
  };

  const activeCategories = categories.filter((category) => !category.deleted);

  return (
    <div className="w-[80%] mx-auto">
      {error && (
        <div className="text-center text-rose-700 font-bold">{error}</div>
      )}
      <div className="flex flex-col justify-center items-center">
        {isEditingBudget ? (
          <div className="flex gap-3">
            <input
              type="text"
              value={newBudgetAmount}
              onChange={(e) => setNewBudgetAmount(e.target.value)}
              className="border-2"
            />
            <button onClick={handleBudgetEditSave}>保存</button>
          </div>
        ) : (
          <div className="flex items-center gap-3 mb-4">
            <p>1週間予算　¥ {budget.amount}</p>
            <button
              onClick={handleBudgetEditStart}
              className="underline decoration-2 underline-offset-4 p-1 hover:text-blue-700 rounded-md transition-colors"
            >
              編集
            </button>
          </div>
        )}
        <form
          onSubmit={handleRecord}
          className="flex flex-col justify-center items-center gap-2"
        >
          <input
            type="text"
            placeholder="金額を入力"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="h-9 w-60 border-2 rounded-md border-gray-500 px-2"
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-9 w-60 border-2 rounded-md border-gray-500 px-2"
          >
            {activeCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-9 w-60 border-2 rounded-md border-gray-500 px-2"
          />
          <input
            type="text"
            placeholder="メモ"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="h-9 w-60 border-2 rounded-md border-gray-500 px-2"
          />
          <button
            type="submit"
            className="h-9 text-blue-700 underline decoration-2 underline-offset-4 px-3 hover:bg-blue-400 hover:text-gray-100 rounded-md transition-colors"
          >
            記録
          </button>
          <Link
            to="/category"
            className="h-9 text-green-700 underline decoration-2 underline-offset-4 hover:bg-green-500 hover:text-gray-100 rounded-md px-3 flex items-center justify-center transition-colors"
          >
            <span>カテゴリーを管理する</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default InputForm;
