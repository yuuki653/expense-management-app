import React, { useState } from "react";
import { Expense } from "../types";

interface InputFormProps {
  addExpense: (expenses: Expense) => void;
}

const InputForm: React.FC<InputFormProps> = ({ addExpense }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [date, setDate] = useState("");
  const [memo, setMemo] = useState("");

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
    console.log({ amount, category, date, memo });
    setAmount("");
    setCategory("food");
    setMemo("");
  };

  return (
    <div className="w-[50%] mx-auto">
      {error && (
        <div className="text-center text-rose-700 font-bold">{error}</div>
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
          <option value="food">食費</option>
          <option value="entertainment">自由費</option>
          <option value="daily">日用品費</option>
          <option value="medical">医療費</option>
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
      </form>
    </div>
  );
};

export default InputForm;
