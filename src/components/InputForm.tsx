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
  const [date, setDate] = useState("");
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

  return (
    <div className="w-[50%] mx-auto">
      {error && (
        <div className="text-center text-rose-700 font-bold">{error}</div>
      )}

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
        <div className="flex gap-3">
          <p>予算：{budget.amount}円</p>
          <button onClick={handleBudgetEditStart}>編集</button>
        </div>
      )}

      <form
        onSubmit={handleRecord}
        className="flex flex-col justify-center items-center gap-2 bg-gray-100 rounded-md p-8 text-center"
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
          {categories.map((category) => (
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
          className="h-9 w-28 mt-4 border-2 border-blue-800 rounded-md px-3 bg-blue-300 hover:bg-blue-400 text-gray-600 transition-colors"
        >
          記録
        </button>
        <Link
          to="/category"
          className="h-9 w-48 mt-4 border-2 border-green-800 bg-green-300 hover:bg-green-500 rounded-md px-3 flex items-center justify-center transition-colors"
        >
          <span>カテゴリーを管理する</span>
        </Link>
      </form>
    </div>
  );
};

export default InputForm;
