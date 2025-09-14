import React from "react";
import InputForm from "../components/InputForm";

import { Expense, Category, Budget } from "../types/index";

interface RecordPageProps {
  addExpense: (expenses: Expense) => void;
  categories: Category[];
  budget: Budget;
  setBudget: (amount: number) => void;
}

const RecordPage: React.FC<RecordPageProps> = ({
  addExpense,
  categories,
  budget,
  setBudget,
}) => {
  return (
    <div className="w-[90%] mx-auto">
      <div className="flex items-center justify-center my-5">
        <hr className="flex-grow border-2 border-gray-400" />
        <p className="mx-3 text-lg font-bold">record</p>
        <hr className="flex-grow border-2 border-gray-400" />
      </div>
      <InputForm
        addExpense={addExpense}
        categories={categories}
        budget={budget}
        setBudget={setBudget}
      />
    </div>
  );
};

export default RecordPage;
