import React from "react";
import InputForm from "../components/InputForm";

import { Expense } from "../types/index";

interface RecordPageProps {
  addExpense: (expenses: Expense) => void;
}

const RecordPage: React.FC<RecordPageProps> = ({ addExpense }) => {
  return (
    <>
      <InputForm addExpense={addExpense} />
    </>
  );
};

export default RecordPage;
