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
    <>
      <InputForm
        addExpense={addExpense}
        categories={categories}
        budget={budget}
        setBudget={setBudget}
      />
    </>
  );
};

export default RecordPage;
